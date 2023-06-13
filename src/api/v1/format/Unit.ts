function getUnitByMeasure(measure: string): string {
  let unit = '';
  const units: {[measure: string]: string} = {
    'count':      '',
    'length':     'm',
    'area':       'm²',
    'perimeter':  'm'
  }

  try {
    unit = units[measure];
  }catch (e) {
    throw new TypeError(`${measure} has no known unit. ${e}`)
  }

  return unit;
}

const UNITS = {
  '': {
    units: ['', 'k'],
    factor: 1000
  },
  'meter': {
    units: ['m', 'km'],
    factor: 1000
  },
  'm': {
    units: ['m', 'km'],
    factor: 1000
  },
  'm²': {
    units: ['㎡', '㎢'],
    factor: 1000000
  }
};

function kFormatter(meter: number, unit: string): string {
  let value = meter;
  let unitString = this.UNITS[unit].units[0]; // 'm';
  const unitFactor = this.UNITS[unit].factor;
  let decimals = 1;
  if (meter >= unitFactor) {
    value = meter / unitFactor;
    unitString = this.UNITS[unit].units[1]; // 'km';
  }
  if (meter >= 100 * unitFactor) {
    decimals = 0;
  }
  return value.toFixed(decimals) + ' ' + unitString;
}

function percentFormatter(percent: number | null): string {

  if (percent == null) {
    return '-- %';
  }

  percent *= 100;

  let decimals = 0;
  let smallSign = '';

  if (Math.abs(percent) < 10) {
    decimals = 2;
    if (Math.abs(percent) < 0.01 && Math.abs(percent) > 0) {
      smallSign = (percent > 0) ? '< ' : '> -';
      return smallSign + '0.01';
    }
  } else if (Math.abs(percent) < 100) {
    decimals = 1;
  }

  return percent.toFixed(decimals) + ' %';

}

export {
  UNITS,
  getUnitByMeasure,
  kFormatter,
  percentFormatter
}
