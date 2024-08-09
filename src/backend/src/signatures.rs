
use rand::prelude::*;
const KEY_SIZE: usize = 256;
const KEY_ELEMENT_SIZE: usize = 32;
fn random_string() -> String {
    let str_bytes = rand::thread_rng().gen::<[u8; KEY_ELEMENT_SIZE]>();
    hex::encode(str_bytes)
}

pub fn generate_label()->String{
    let mut label= String::new();
       for _i in 0..KEY_SIZE {
        label.push_str(&random_string());
    }
    label
}