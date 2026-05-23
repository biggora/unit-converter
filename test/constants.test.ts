/**
 * Verifies that every category file consumes the same numeric value as the
 * corresponding named constant — guards against rename / refactor drift —
 * and that the unit-identifier / category-name string constants are wired
 * through correctly.
 */
import { describe, expect, it } from 'vitest';

import * as categoriesC from '../src/constants/categories.js';
import {
  length,
  ACRE,
  ANGSTROM,
  ARCMINUTE,
  ATMOSPHERE,
  BIT,
  BYTE,
  CELSIUS,
  CUBIC_METER,
  DAY,
  DEGREE,
  FAHRENHEIT,
  FOOT,
  HOUR,
  INCH,
  KELVIN,
  KIBIBYTE,
  KILOGRAM,
  KILOMETER_PER_HOUR,
  LIGHT_YEAR,
  LITER,
  MACH,
  METER,
  METER_PER_SECOND,
  MILE,
  MILLIMETER_OF_MERCURY,
  PARSEC,
  PASCAL,
  POUND,
  PSI,
  RADIAN,
  RANKINE,
  SECOND,
  SHORT_TON,
  SPEED_OF_LIGHT,
  SQUARE_METER,
  TONNE,
  TURN,
  US_GALLON,
  YEAR,
} from '../src';

import * as angleC from '../src/constants/angle.js';
import * as areaC from '../src/constants/area.js';
import * as dataStorageC from '../src/constants/data-storage.js';
import * as lengthC from '../src/constants/length.js';
import * as massC from '../src/constants/mass.js';
import * as pressureC from '../src/constants/pressure.js';
import * as speedC from '../src/constants/speed.js';
import * as temperatureC from '../src/constants/temperature.js';
import * as timeC from '../src/constants/time.js';
import * as volumeC from '../src/constants/volume.js';

import {
  angleCategory,
  areaCategory,
  dataStorageCategory,
  lengthCategory,
  massCategory,
  pressureCategory,
  speedCategory,
  temperatureCategory,
  timeCategory,
  volumeCategory,
} from '../src';

describe('length constants', () => {
  it('METER_TO_METER is the anchor identity', () => {
    expect(lengthC.METER_TO_METER).toBe(1);
    expect(lengthCategory.units.m?.ratio).toBe(lengthC.METER_TO_METER);
  });

  it('INCH_TO_METER matches NIST SP 811 §B.8', () => {
    expect(lengthC.INCH_TO_METER).toBe(0.0254);
    expect(lengthCategory.units.in?.ratio).toBe(lengthC.INCH_TO_METER);
  });

  it('MILE_TO_METER matches NIST SP 811 §B.8', () => {
    expect(lengthC.MILE_TO_METER).toBe(1609.344);
    expect(lengthCategory.units.mi?.ratio).toBe(lengthC.MILE_TO_METER);
  });
});

describe('mass constants', () => {
  it('KILOGRAM_TO_KILOGRAM is the anchor identity', () => {
    expect(massC.KILOGRAM_TO_KILOGRAM).toBe(1);
  });

  it('POUND_TO_KILOGRAM matches NIST SP 811 §B.8', () => {
    expect(massC.POUND_TO_KILOGRAM).toBe(0.45359237);
    expect(massCategory.units.lb?.ratio).toBe(massC.POUND_TO_KILOGRAM);
  });

  it('CARAT_TO_KILOGRAM = 200 mg exact', () => {
    expect(massC.CARAT_TO_KILOGRAM).toBe(0.0002);
    expect(massCategory.units.ct?.ratio).toBe(massC.CARAT_TO_KILOGRAM);
  });
});

describe('time constants', () => {
  it('SECOND_TO_SECOND is the anchor identity', () => {
    expect(timeC.SECOND_TO_SECOND).toBe(1);
  });

  it('HOUR_TO_SECOND and HOUR_TO_NANOSECOND_BIGINT differ by 1e9', () => {
    expect(timeC.HOUR_TO_SECOND).toBe(3_600);
    expect(timeC.HOUR_TO_NANOSECOND_BIGINT).toBe(3_600_000_000_000n);
    expect(timeCategory.units.h?.ratio).toBe(timeC.HOUR_TO_SECOND);
    expect(timeCategory.units.h?.bigintRatio).toBe(timeC.HOUR_TO_NANOSECOND_BIGINT);
  });

  it('DAY_TO_SECOND = 86400', () => {
    expect(timeC.DAY_TO_SECOND).toBe(86_400);
  });
});

describe('temperature constants', () => {
  it('Kelvin is identity', () => {
    expect(temperatureC.KELVIN_TO_KELVIN_RATIO).toBe(1);
    expect(temperatureC.KELVIN_TO_KELVIN_OFFSET).toBe(0);
  });

  it('Celsius offset is 273.15', () => {
    expect(temperatureC.CELSIUS_TO_KELVIN_OFFSET).toBe(273.15);
    expect(temperatureCategory.units.C?.offset).toBe(temperatureC.CELSIUS_TO_KELVIN_OFFSET);
  });

  it('Fahrenheit slope is 5/9', () => {
    expect(temperatureC.FAHRENHEIT_TO_KELVIN_RATIO).toBe(5 / 9);
    expect(temperatureCategory.units.F?.ratio).toBe(temperatureC.FAHRENHEIT_TO_KELVIN_RATIO);
  });
});

describe('volume constants', () => {
  it('LITER_TO_CUBIC_METER = 1e-3', () => {
    expect(volumeC.LITER_TO_CUBIC_METER).toBe(1e-3);
  });

  it('US_GALLON_TO_CUBIC_METER matches NIST', () => {
    expect(volumeC.US_GALLON_TO_CUBIC_METER).toBe(0.003785411784);
    expect(volumeCategory.units['us-gal']?.ratio).toBe(volumeC.US_GALLON_TO_CUBIC_METER);
  });

  it('IMPERIAL_GALLON_TO_CUBIC_METER = 4.54609 L', () => {
    expect(volumeC.IMPERIAL_GALLON_TO_CUBIC_METER).toBe(0.00454609);
  });
});

describe('area constants', () => {
  it('HECTARE_TO_SQUARE_METER = 10000', () => {
    expect(areaC.HECTARE_TO_SQUARE_METER).toBe(10_000);
    expect(areaCategory.units.ha?.ratio).toBe(areaC.HECTARE_TO_SQUARE_METER);
  });

  it('ACRE_TO_SQUARE_METER matches imperial definition', () => {
    expect(areaC.ACRE_TO_SQUARE_METER).toBe(4_046.8564224);
  });
});

describe('speed constants', () => {
  it('METER_PER_SECOND_TO_METER_PER_SECOND is identity', () => {
    expect(speedC.METER_PER_SECOND_TO_METER_PER_SECOND).toBe(1);
  });

  it('SPEED_OF_LIGHT_TO_METER_PER_SECOND matches SI', () => {
    expect(speedC.SPEED_OF_LIGHT_TO_METER_PER_SECOND).toBe(299_792_458);
    expect(speedCategory.units.c?.ratio).toBe(speedC.SPEED_OF_LIGHT_TO_METER_PER_SECOND);
  });

  it('KILOMETER_PER_HOUR_TO_METER_PER_SECOND = 1/3.6', () => {
    expect(speedC.KILOMETER_PER_HOUR_TO_METER_PER_SECOND).toBe(1 / 3.6);
  });
});

describe('data-storage constants', () => {
  it('BYTE_TO_BYTE is identity (float and bigint)', () => {
    expect(dataStorageC.BYTE_TO_BYTE).toBe(1);
    expect(dataStorageC.BYTE_TO_BYTE_BIGINT).toBe(1n);
  });

  it('KIBIBYTE_TO_BYTE = 1024 (float and bigint match)', () => {
    expect(dataStorageC.KIBIBYTE_TO_BYTE).toBe(1_024);
    expect(dataStorageC.KIBIBYTE_TO_BYTE_BIGINT).toBe(1_024n);
    expect(dataStorageCategory.units.KiB?.ratio).toBe(dataStorageC.KIBIBYTE_TO_BYTE);
    expect(dataStorageCategory.units.KiB?.bigintRatio).toBe(dataStorageC.KIBIBYTE_TO_BYTE_BIGINT);
  });

  it('PEBIBYTE_TO_BYTE_BIGINT is exact 2^50', () => {
    expect(dataStorageC.PEBIBYTE_TO_BYTE_BIGINT).toBe(1_125_899_906_842_624n);
  });
});

describe('angle constants', () => {
  it('RADIAN_TO_RADIAN is identity', () => {
    expect(angleC.RADIAN_TO_RADIAN).toBe(1);
  });

  it('DEGREE_TO_RADIAN = PI/180', () => {
    expect(angleC.DEGREE_TO_RADIAN).toBe(Math.PI / 180);
    expect(angleCategory.units.deg?.ratio).toBe(angleC.DEGREE_TO_RADIAN);
  });

  it('TURN_TO_RADIAN = 2*PI', () => {
    expect(angleC.TURN_TO_RADIAN).toBe(2 * Math.PI);
  });
});

describe('pressure constants', () => {
  it('ATMOSPHERE_TO_PASCAL = 101325 (NIST exact)', () => {
    expect(pressureC.ATMOSPHERE_TO_PASCAL).toBe(101_325);
    expect(pressureCategory.units.atm?.ratio).toBe(pressureC.ATMOSPHERE_TO_PASCAL);
  });

  it('BAR_TO_PASCAL = 100000', () => {
    expect(pressureC.BAR_TO_PASCAL).toBe(100_000);
  });

  it('PSI_TO_PASCAL matches imperial definition', () => {
    expect(pressureC.PSI_TO_PASCAL).toBe(6894.757293168);
  });
});

describe('unit identifier constants', () => {
  it('length identifiers map to registered unit keys', () => {
    expect(METER).toBe('m');
    expect(INCH).toBe('in');
    expect(FOOT).toBe('ft');
    expect(MILE).toBe('mi');
    expect(ANGSTROM).toBe('Å');
    expect(LIGHT_YEAR).toBe('ly');
    expect(PARSEC).toBe('pc');
  });

  it('mass identifiers', () => {
    expect(KILOGRAM).toBe('kg');
    expect(POUND).toBe('lb');
    expect(TONNE).toBe('t');
    expect(SHORT_TON).toBe('ton');
  });

  it('time identifiers', () => {
    expect(SECOND).toBe('s');
    expect(HOUR).toBe('h');
    expect(DAY).toBe('d');
    expect(YEAR).toBe('year');
  });

  it('temperature identifiers', () => {
    expect(KELVIN).toBe('K');
    expect(CELSIUS).toBe('C');
    expect(FAHRENHEIT).toBe('F');
    expect(RANKINE).toBe('R');
  });

  it('volume identifiers', () => {
    expect(CUBIC_METER).toBe('m3');
    expect(LITER).toBe('L');
    expect(US_GALLON).toBe('us-gal');
  });

  it('area identifiers', () => {
    expect(SQUARE_METER).toBe('m2');
    expect(ACRE).toBe('acre');
  });

  it('speed identifiers', () => {
    expect(METER_PER_SECOND).toBe('m/s');
    expect(KILOMETER_PER_HOUR).toBe('km/h');
    expect(SPEED_OF_LIGHT).toBe('c');
    expect(MACH).toBe('mach');
  });

  it('data-storage identifiers', () => {
    expect(BYTE).toBe('B');
    expect(KIBIBYTE).toBe('KiB');
    expect(BIT).toBe('bit');
  });

  it('angle identifiers', () => {
    expect(RADIAN).toBe('rad');
    expect(DEGREE).toBe('deg');
    expect(TURN).toBe('turn');
    expect(ARCMINUTE).toBe('arcmin');
  });

  it('pressure identifiers', () => {
    expect(PASCAL).toBe('Pa');
    expect(ATMOSPHERE).toBe('atm');
    expect(MILLIMETER_OF_MERCURY).toBe('mmHg');
    expect(PSI).toBe('psi');
  });

  it('identifiers work as drop-in arguments for converter functions', () => {
    expect(length(5, METER).to(FOOT)).toBe(length(5, 'm').to('ft'));
    expect(length(1, INCH).to(METER)).toBe(0.0254);
  });
});

describe('category-name constants', () => {
  it('expose all 10 category names', () => {
    expect(categoriesC.LENGTH).toBe('length');
    expect(categoriesC.MASS).toBe('mass');
    expect(categoriesC.TIME).toBe('time');
    expect(categoriesC.TEMPERATURE).toBe('temperature');
    expect(categoriesC.VOLUME).toBe('volume');
    expect(categoriesC.AREA).toBe('area');
    expect(categoriesC.SPEED).toBe('speed');
    expect(categoriesC.DATA_STORAGE).toBe('dataStorage');
    expect(categoriesC.ANGLE).toBe('angle');
    expect(categoriesC.PRESSURE).toBe('pressure');
  });
});
