use sha2::{Digest, Sha256};
use std::convert::TryInto;

const KEY_SIZE: usize = 256;
const KEY_ELEMENT_SIZE: usize = 32;

#[derive(Debug)]
pub struct PrivateKey {
    key_pairs: Vec<(String, String)>,
}

#[derive(Clone, Debug, candid::CandidType, Serialize, Deserialize)]
pub struct PublicKey {
    key_pairs: Vec<(String, String)>,
}

#[derive(Clone, Debug, candid::CandidType, Serialize, Deserialize)]
pub struct Signature {
    signatures: Vec<String>,
}

impl PrivateKey {
    pub fn get_key(&self, i: usize) -> (String, String) {
        self.key_pairs[i].clone()
    }
}

impl PublicKey {
    pub fn get_key(&self, i: usize) -> (String, String) {
        self.key_pairs[i].clone()
    }
}

impl Signature {
    pub fn get_key(&self, i: usize) -> String {
        self.signatures[i].clone()
    }
}

/// Generates a deterministic private key from a 256-bit input string.
///
/// # Examples
/// ```rust
/// let private_key = generate_private_key("your_256_bit_input_string");
/// ```
pub fn generate_private_key(input: &str) -> PrivateKey {
    let mut private_key: Vec<(String, String)> = Vec::with_capacity(KEY_SIZE);

    let mut hasher = Sha256::new();
    hasher.update(input.as_bytes());
    let hash_output = hasher.finalize();

    // Divide the hash into 256 key pairs
    for i in 0..KEY_SIZE {
        let start = (i * KEY_ELEMENT_SIZE / 8) % hash_output.len();
        let end = (start + KEY_ELEMENT_SIZE / 8) % hash_output.len();

        // Handle wrapping around if necessary
        let (first_half, second_half) = if end > start {
            (
                &hash_output[start..start + KEY_ELEMENT_SIZE / 16],
                &hash_output[start + KEY_ELEMENT_SIZE / 16..end],
            )
        } else {
            (
                &hash_output[start..],
                &hash_output[..KEY_ELEMENT_SIZE / 16],
            )
        };

        let key_str1 = hex::encode(first_half);
        let key_str2 = hex::encode(second_half);

        private_key.push((key_str1, key_str2));
    }

    PrivateKey {
        key_pairs: private_key,
    }
}

/// Hash a string slice.
pub fn hash(str: &str) -> String {
    let mut hasher = Sha256::new();
    hasher.update(str);
    hex::encode(hasher.finalize())
}

/// Create a public key from the generated private key
/// # Example
/// ```rust
/// let private_key = generate_private_key("your_256_bit_input_string");
/// let public_key = create_public_key(&private_key);
/// ```
pub fn create_public_key(private_key: &PrivateKey) -> PublicKey {
    let mut public_key: Vec<(String, String)> = Vec::with_capacity(KEY_SIZE);
    for item in private_key.key_pairs.iter() {
        let (first_key, second_key) = item;
        public_key.push((hash(first_key), hash(second_key)));
    }
    PublicKey {
        key_pairs: public_key,
    }
}

fn hash_to_binary_array(hash_string: String) -> Vec<u8> {
    let message = hex::decode(hash_string);
    let mut str_binary_array: Vec<u8> = Vec::with_capacity(KEY_SIZE);
    match message {
        Ok(bytes) => {
            for byte in bytes.iter() {
                for i in (0..8).rev() {
                    let bit = (byte >> i) & 1;
                    str_binary_array.push(bit);
                }
            }
            str_binary_array
        }
        Err(_error) => str_binary_array,
    }
}

/// Sign a message using the private key and get a signature. A message must be hashed first as shown below.
/// # Example
/// ```rust
/// let private_key = generate_private_key("your_256_bit_input_string");
/// let message = hash("My confidential message");
/// let signature = sign(message, &private_key);
/// ```
pub fn sign(message_hash: String, private_key: &PrivateKey) -> Signature {
    let message_binary_array = hash_to_binary_array(message_hash);
    let mut signature_array: Vec<String> = Vec::with_capacity(KEY_SIZE);
    for (index, item) in message_binary_array.iter().enumerate() {
        let (first_key, second_key) = private_key.get_key(index);
        if *item == 0 {
            signature_array.push(first_key);
        } else {
            signature_array.push(second_key);
        }
    }
    Signature {
        signatures: signature_array,
    }
}

/// Verify a message using the signature and the public key
/// # Example
/// ```rust
/// let private_key = generate_private_key("your_256_bit_input_string");
/// let public_key = create_public_key(&private_key);
/// let message = hash("My confidential message");
/// let signature = sign(message.clone(), &private_key);
/// let message_is_authentic = verify(message.clone(), &signature, &public_key);
/// assert_eq!(true, message_is_authentic);
/// ```
pub fn verify(message_hash: String, signature: &Signature, public_key: &PublicKey) -> bool {
    let message_binary_array = hash_to_binary_array(message_hash);
    for (index, item) in message_binary_array.iter().enumerate() {
        let sig = signature.get_key(index);
        let private_key_hash = hash(&sig);
        let (first_pub_key_hash, second_pub_key_hash) = public_key.get_key(index);
        if *item == 0 {
            if private_key_hash != first_pub_key_hash {
                return false;
            }
        } else if private_key_hash != second_pub_key_hash {
            return false;
        }
    }
    true
}
