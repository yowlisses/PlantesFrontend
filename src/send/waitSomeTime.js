export async function waitSomeTime() {
  return new Promise((resolve, reject) =>
    setTimeout(() => resolve(true), 5000),
  );
}