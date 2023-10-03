export function getLocation(): Promise<number[]> {
  let coords: number[] = [];
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        coords = [position.coords.latitude, position.coords.longitude];
        resolve(coords);
      },
      function () {
        reject("Please allow us location permission!");
      }
    );
  });
}

export function normalizeNumber(
  n: number,
  digitsAfterDecimal: number | undefined = 2
): number {
  let str = n.toString();
  if (digitsAfterDecimal !== undefined) {
    str = Number(str).toFixed(digitsAfterDecimal).toString();
  }
  if (parseInt(str) === parseFloat(str)) {
    str = parseInt(str).toString();
  }
  return Number(str);
}
