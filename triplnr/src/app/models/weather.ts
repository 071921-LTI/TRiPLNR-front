//weather model that matches day model in the backend
export interface Weather {
      datetime?:string;
      temp?:Float32Array;
      feelslike?:Float32Array;
      humidity?:Float32Array;
      precip?:Float32Array;
      precipprob?:Float32Array;
      snow?:number;
      snowdepth?:number;
      windgust?:Float32Array;
      windspeed?:Float32Array;
      cloudcover?:Float32Array;
      visibility?:Float32Array;
      uvindex?:number;
      severerisk?:number;
      sunrise?:string;
      sunset?:string;
      conditions?:string;
      icon?:string;
}