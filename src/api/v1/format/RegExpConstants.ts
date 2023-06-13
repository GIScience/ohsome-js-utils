// use to combine patterns and use it as new RegExp(pattern,flags)

const COLON_SEP = "\\s*:\\s*";
const COMMA_SEP = "\\s*,\\s*";
const FLOAT = "(?:[-+]?[0-9]*\\.?[0-9]+(?:[eE][-+]?[0-9]+)?)";

const POINT2D = FLOAT + COMMA_SEP + FLOAT;

const BOUNDARY_ID = "[^:|]+";

const BBOX    = "^\\s*" + group(capture(BOUNDARY_ID) + COLON_SEP) + "?" + capture(capture(POINT2D) + COMMA_SEP + capture(POINT2D)) + "\\s*$";
const BCIRCLE = "^\\s*" + group(capture(BOUNDARY_ID) + COLON_SEP) + "?" + capture(capture(POINT2D) + COMMA_SEP + capture(FLOAT  )) + "\\s*$";
const BPOLY   = "^\\s*" + group(capture(BOUNDARY_ID) + COLON_SEP) + "?" + capture(capture(POINT2D) + group(COMMA_SEP + POINT2D) + "{2,}" + COMMA_SEP + capture(POINT2D) ) + "\\s*$";

function capture(pattern: string): string {
  return "(" + pattern + ")";
}

function group(pattern: string): string {
  return "(?:" + pattern + ")";
}

export {
  capture,
  group,
  BOUNDARY_ID,
  FLOAT,
  COMMA_SEP,
  COLON_SEP,
  POINT2D,
  BBOX,
  BCIRCLE,
  BPOLY
}
