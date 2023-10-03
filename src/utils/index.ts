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
