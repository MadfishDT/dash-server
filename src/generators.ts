import { TokenGenerator, TokenBase } from 'ts-token-generator';
 
export class Gernerators {
    
    constructor() {

    }
    public static bootstrap () : Gernerators {
        return new Gernerators();
      }
    
    public tokenGenerated() : string{
        const tokgen = new TokenGenerator(); // Default is a 128-bit token encoded in base58
        return tokgen.generate();
    }
}
