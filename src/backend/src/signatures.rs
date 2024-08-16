use rand::prelude::*;

const KEY_SIZE: usize = 32; // 32 bytes * 8 bits/byte = 256 bits

fn random_string() -> String {
    let str_bytes = rand::thread_rng().gen::<[u8; KEY_SIZE]>();
    hex::encode(str_bytes)
}

pub fn generate_label() -> String {
    random_string()
}
