//import { Colors } from "constants/Colors";
import { CarType } from '../../lib/types';
import Cabriolet from './cabriolet';
import Coupe from './coupe';
import Grandcoupe from './grandcoupe';
import Hatch from './hatch';
import Kombi from './kombi';
import Pickup from './pickup';
import Roadster from './roadster';
import Sedan from './sedan';
import Suv from './suv';

export { default as Cabriolet } from './cabriolet';
export { default as Coupe } from './coupe';
export { default as Grandcoupe } from './grandcoupe';
export { default as Hatch } from './hatch';
export { default as Kombi } from './kombi';
export { default as Pickup } from './pickup';
export { default as Roadster } from './roadster';
export { default as Sedan } from './sedan';
export { default as Suv } from './suv';

export function GetCarImage({
  type,
  strokeWidth = 1,
  stroke = '#fff',
  width = 64,
  height = 128,
}: {
  type: CarType;
  strokeWidth: number;
  stroke: string;
  width: string | number;
  height: number;
}) /*//colorScheme: "light" | "dark" = "dark",
    width: number = 64,
    height: number = 128,
    strokeWidth = 1*/
{
  switch (type) {
    case 'CABRIOLET':
      return (
        <Cabriolet
          stroke={stroke}
          strokeWidth={strokeWidth}
          height={height}
          width={width}
        />
      );
    case 'COUPE':
      return (
        <Coupe
          strokeWidth={strokeWidth}
          stroke={stroke}
          height={height}
          width={width}
        />
      );
    case 'GRANDCOUPE':
      return (
        <Grandcoupe
          strokeWidth={strokeWidth}
          stroke={stroke}
          height={height}
          width={width}
        />
      );
    case 'HATCH':
      return (
        <Hatch
          stroke={stroke}
          strokeWidth={strokeWidth}
          height={height}
          width={width}
        />
      );
    case 'KOMBI':
      return (
        <Kombi
          strokeWidth={strokeWidth}
          stroke={stroke}
          height={height}
          width={width}
        />
      );
    case 'PICKUP':
      return (
        <Pickup
          stroke={stroke}
          strokeWidth={strokeWidth}
          height={height}
          width={width}
        />
      );
    case 'ROADSTER':
      return (
        <Roadster
          stroke={stroke}
          strokeWidth={strokeWidth}
          height={height}
          width={width}
        />
      );
    case 'SEDAN':
      return (
        <Sedan
          strokeWidth={strokeWidth}
          stroke={stroke}
          height={height}
          width={width}
        />
      );
    case 'SUV':
      return (
        <Suv
          strokeWidth={strokeWidth}
          stroke={stroke}
          height={height}
          width={width}
        />
      );
    default:
      return (
        <Grandcoupe
          strokeWidth={strokeWidth}
          stroke={stroke}
          height={height}
          width={width}
        />
      );
  }
}
