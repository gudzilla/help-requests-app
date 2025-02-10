type Obj = Record<string, unknown>;

export const areObjectsDeepEqual = (obj1: Obj, obj2: Obj): boolean => {
  if (obj1 === obj2) return true;
  if (typeof obj1 !== 'object' || typeof obj2 !== 'object' || !obj1 || !obj2)
    return false;

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  if (keys1.length !== keys2.length) return false;

  return keys1.every((key) => {
    const val1 = obj1[key];
    const val2 = obj2[key];

    if (
      typeof val1 === 'object' &&
      val1 !== null &&
      typeof val2 === 'object' &&
      val2 !== null
    ) {
      return areObjectsDeepEqual(val1 as Obj, val2 as Obj);
    }

    return val1 === val2;
  });
};
