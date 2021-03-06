/**
 * Includes creating, shifting and permutations functions of S-Box arrays of DES and AES algorithms
 * Singleton Class
 * @module lib/desAes
 */
const njs = require('@0xcmdr/numjs')
class desAes {
  constructor () {
    // Generate perTab array
    this.perTab = this.desGenerator()
    // Generate AES Sbox
    this.aesBox = this.aesGenerator()
    // Initialize initial permutation table of DES Algorithm
    this.desPerm = [58, 50, 42, 34, 26, 18, 10, 2,
      60, 52, 44, 36, 28, 20, 12, 4,
      62, 54, 46, 38, 30, 22, 14, 6,
      64, 56, 48, 40, 32, 24, 16, 8,
      57, 49, 41, 33, 25, 17, 9, 1,
      59, 51, 43, 35, 27, 19, 11, 3,
      61, 53, 45, 37, 29, 21, 13, 5,
      63, 55, 47, 39, 31, 23, 15, 7]
    const example = njs.array(this.desPerm).clone()

    this.desPermutation(example, 0)
  }

  /**
   * Initialize s-boxs of DES Algorithm and create our 16x32 arrays from those
   * @return {NdArray}  Return 16x16 Hexadecimal, AES S-Box Array.
   */
  desGenerator () {
    // Transposition of each s-box was taken with the .T property
    const s1 = njs.uint8([
      [14, 4, 13, 1, 2, 15, 11, 8, 3, 10, 6, 12, 5, 9, 0, 7],
      [0, 15, 7, 4, 14, 2, 13, 1, 10, 6, 12, 11, 9, 5, 3, 8],
      [4, 1, 14, 8, 13, 6, 2, 11, 15, 12, 9, 7, 3, 10, 5, 0],
      [15, 12, 8, 2, 4, 9, 1, 7, 5, 11, 3, 14, 10, 0, 6, 13]
    ]
    ).T
    const s2 = njs.uint8([
      [15, 1, 8, 14, 6, 11, 3, 4, 9, 7, 2, 13, 12, 0, 5, 10],
      [3, 13, 4, 7, 15, 2, 8, 14, 12, 0, 1, 10, 6, 9, 11, 5],
      [0, 14, 7, 11, 10, 4, 13, 1, 5, 8, 12, 6, 9, 3, 2, 15],
      [13, 8, 10, 1, 3, 15, 4, 2, 11, 6, 7, 12, 0, 5, 14, 9]
    ]
    ).T
    const s3 = njs.uint8([
      [10, 0, 9, 14, 6, 3, 15, 5, 1, 13, 12, 7, 11, 4, 2, 8],
      [13, 7, 0, 9, 3, 4, 6, 10, 2, 8, 5, 14, 12, 11, 15, 1],
      [13, 6, 4, 9, 8, 15, 3, 0, 11, 1, 2, 12, 5, 10, 14, 7],
      [1, 10, 13, 0, 6, 9, 8, 7, 4, 15, 14, 3, 11, 5, 2, 12]
    ]
    ).T
    const s4 = njs.uint8([
      [7, 13, 14, 3, 0, 6, 9, 10, 1, 2, 8, 5, 11, 12, 4, 15],
      [13, 8, 11, 5, 6, 15, 0, 3, 4, 7, 2, 12, 1, 10, 14, 9],
      [10, 6, 9, 0, 12, 11, 7, 13, 15, 1, 3, 14, 5, 2, 8, 4],
      [3, 15, 0, 6, 10, 1, 13, 8, 9, 4, 5, 11, 12, 7, 2, 14]
    ]
    ).T
    const s5 = njs.uint8([
      [2, 12, 4, 1, 7, 10, 11, 6, 8, 5, 3, 15, 13, 0, 14, 9],
      [14, 11, 2, 12, 4, 7, 13, 1, 5, 0, 15, 10, 3, 9, 8, 6],
      [4, 2, 1, 11, 10, 13, 7, 8, 15, 9, 12, 5, 6, 3, 0, 14],
      [11, 8, 12, 7, 1, 14, 2, 13, 6, 15, 0, 9, 10, 4, 5, 3]
    ]
    ).T
    const s6 = njs.uint8([
      [12, 1, 10, 15, 9, 2, 6, 8, 0, 13, 3, 4, 14, 7, 5, 11],
      [10, 15, 4, 2, 7, 12, 9, 5, 6, 1, 13, 14, 0, 11, 3, 8],
      [9, 14, 15, 5, 2, 8, 12, 3, 7, 0, 4, 10, 1, 13, 11, 6],
      [4, 3, 2, 12, 9, 5, 15, 10, 11, 14, 1, 7, 6, 0, 8, 13]
    ]
    ).T
    const s7 = njs.uint8([
      [4, 11, 2, 14, 15, 0, 8, 13, 3, 12, 9, 7, 5, 10, 6, 1],
      [13, 0, 11, 7, 4, 9, 1, 10, 14, 3, 5, 12, 2, 15, 8, 6],
      [1, 4, 11, 13, 12, 3, 7, 14, 10, 15, 6, 8, 0, 5, 9, 2],
      [6, 11, 13, 8, 1, 4, 10, 7, 9, 5, 0, 15, 14, 2, 3, 12]
    ]
    ).T
    const s8 = njs.uint8([
      [13, 2, 8, 4, 6, 15, 11, 1, 10, 9, 3, 14, 5, 0, 12, 7],
      [1, 15, 13, 8, 10, 3, 7, 4, 12, 5, 6, 11, 0, 14, 9, 2],
      [7, 11, 4, 1, 9, 12, 14, 2, 0, 6, 10, 13, 15, 3, 5, 8],
      [2, 1, 14, 7, 4, 10, 8, 13, 15, 12, 9, 0, 3, 5, 6, 11]
    ]
    ).T
    // Create our 16 x 32 array named perTab using transposed arrays
    return njs.concatenate(s1, s2, s3, s4, s5, s6, s7, s8)
  }

  /**
   * Initialize s-box of AES Algorithm and create our 16x16 arrays from those
   * @return {NdArray}  Return 16x16 Hexadecimal, AES S-Box Array.
   */
  aesGenerator () {
    /* Elements of AES S-Box are hexadecimal numbers. Thus every element prefixed by 0x */
    const sBox = njs.uint8([
      [0x63, 0x7C, 0x77, 0x7B, 0xF2, 0x6B, 0x6F, 0xC5, 0x30, 0x01, 0x67, 0x2B, 0xFE, 0xD7, 0xAB, 0x76],
      [0xCA, 0x82, 0xC9, 0x7D, 0xFA, 0x59, 0x47, 0xF0, 0xAD, 0xD4, 0xA2, 0xAF, 0x9C, 0xA4, 0x72, 0xC0],
      [0xB7, 0xFD, 0x93, 0x26, 0x36, 0x3F, 0xF7, 0xCC, 0x34, 0xA5, 0xE5, 0xF1, 0x71, 0xD8, 0x31, 0x15],
      [0x04, 0xC7, 0x23, 0xC3, 0x18, 0x96, 0x05, 0x9A, 0x07, 0x12, 0x80, 0xE2, 0xEB, 0x27, 0xB2, 0x75],
      [0x09, 0x83, 0x2C, 0x1A, 0x1B, 0x6E, 0x5A, 0xA0, 0x52, 0x3B, 0xD6, 0xB3, 0x29, 0xE3, 0x2F, 0x84],
      [0x53, 0xD1, 0x00, 0xED, 0x20, 0xFC, 0xB1, 0x5B, 0x6A, 0xCB, 0xBE, 0x39, 0x4A, 0x4C, 0x58, 0xCF],
      [0xD0, 0xEF, 0xAA, 0xFB, 0x43, 0x4D, 0x33, 0x85, 0x45, 0xF9, 0x02, 0x7F, 0x50, 0x3C, 0x9F, 0xA8],
      [0x51, 0xA3, 0x40, 0x8F, 0x92, 0x9D, 0x38, 0xF5, 0xBC, 0xB6, 0xDA, 0x21, 0x10, 0xFF, 0xF3, 0xD2],
      [0xCD, 0x0C, 0x13, 0xEC, 0x5F, 0x97, 0x44, 0x17, 0xC4, 0xA7, 0x7E, 0x3D, 0x64, 0x5D, 0x19, 0x73],
      [0x60, 0x81, 0x4F, 0xDC, 0x22, 0x2A, 0x90, 0x88, 0x46, 0xEE, 0xB8, 0x14, 0xDE, 0x5E, 0x0B, 0xDB],
      [0xE0, 0x32, 0x3A, 0x0A, 0x49, 0x06, 0x24, 0x5C, 0xC2, 0xD3, 0xAC, 0x62, 0x91, 0x95, 0xE4, 0x79],
      [0xE7, 0xC8, 0x37, 0x6D, 0x8D, 0xD5, 0x4E, 0xA9, 0x6C, 0x56, 0xF4, 0xEA, 0x65, 0x7A, 0xAE, 0x08],
      [0xBA, 0x78, 0x25, 0x2E, 0x1C, 0xA6, 0xB4, 0xC6, 0xE8, 0xDD, 0x74, 0x1F, 0x4B, 0xBD, 0x8B, 0x8A],
      [0x70, 0x3E, 0xB5, 0x66, 0x48, 0x03, 0xF6, 0x0E, 0x61, 0x35, 0x57, 0xB9, 0x86, 0xC1, 0x1D, 0x9E],
      [0xE1, 0xF8, 0x98, 0x11, 0x69, 0xD9, 0x8E, 0x94, 0x9B, 0x1E, 0x87, 0xE9, 0xCE, 0x55, 0x28, 0xDF],
      [0x8C, 0xA1, 0x89, 0x0D, 0xBF, 0xE6, 0x42, 0x68, 0x41, 0x99, 0x2D, 0x0F, 0xB0, 0x54, 0xBB, 0x16]
    ]
    )
    return sBox
  }

  /**
   * Shifting AES S-Box rows using selected columns from perTab Array
   * @param {integer} a - Random generated number
   * @return {NdArray}  Return AES S-Box Array after shifting rows .
   */
  shiftRows (a) {
    // Get column a from perTab array
    const colA = this.perTab.pick(null, a)
    // Clone original Aes SBox Array
    const aesBox = this.aesBox.clone()
    // Shift rows for using colA array
    for (let i = 0; i < colA.shape[0]; i++) {
      // Shift columns i and value of colA[i]
      // Get row at indexed i
      const row1 = this.aesBox.pick(i, null)
      // Get row at indexed colA[i]
      const row2 = this.aesBox.pick(colA.get(i), null)
      // row[i] = row[colA[i]]
      aesBox.pick(i, null).assign(row2, false)
      // row[colA[i]] = row[i]
      aesBox.pick(colA.get(i), null).assign(row1, false)
    }
    // return shifted array
    return aesBox
  }

  /**
   * Shifting AES S-Box columns using selected columns from perTab Array
   * @param {integer} b - Random generated number
   * @return {NdArray}  Return AES S-Box Array after shifting columns .
   */
  shiftCols (b) {
    // Get column a from perTab array
    const colA = this.perTab.pick(null, b)
    // Clone original Aes SBox Array
    const aesBox = this.aesBox.clone()
    // Shift rows for using colA array
    for (let i = 0; i < colA.shape[0]; i++) {
      // Shift columns i and value of colA[i]
      // Get column at indexed i
      const col1 = this.aesBox.pick(null, i)
      // Get column at indexed colA[i]
      const col2 = this.aesBox.pick(null, colA.get(i))
      // col[i] = col[colA[i]]
      aesBox.pick(null, i).assign(col2, false)
      // col[colA[i]] = col[i]
      aesBox.pick(null, colA.get(i)).assign(col1, false)
    }
    // return shifted array
    return aesBox
  }

  /**
   * Algorithm - Step 13
   * Permutate block contains 64 pixels by DES permutation table
   * @param {NdArray} block - A Block which contains 265 pixels
   * @param {integer} part - Which part of block permutated 0,1,2, or 3s
   */
  desPermutation (block, part) {
    // Calculate indexs
    const firsIndex = part * 64
    const lastIndex = firsIndex + 64
    // Fetch subblock from block array
    const subBlock = block.clone().slice([firsIndex, lastIndex])
    // Permutate using initial permuation table of DES Algorithm
    for (let i = 0; i < this.desPerm.length; i++) {
      // block[ firstIndex + i ] = sublock[ desPerm[i] -1 ]
      block.set(firsIndex + i, subBlock.get(this.desPerm[i] - 1))
      // We substact desPerm[i] - 1 beacuse permutation table of DES has not zero based index
    }
  }
}

// eslint-disable-next-line new-cap
module.exports = new desAes()
