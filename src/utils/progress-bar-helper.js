export function getStepFromPath(path) {
  // URL: temp/slider/new
  if (/slider\/new/.test(path)) {
    return 0;

  // URL: temp/slider/:id/slides OR temp/slider/:id/settings
  } else if (/slides|settings/.test(path)) {
    return 1;

  // URL: temp/slider/:id/code
  } else if (/code/.test(path)) {
    return 2;
  }
}
