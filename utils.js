export const getAge = birthDate => {
  const now = new Date().getTime();
  const dob = Date.parse(birthDate);
  return Math.floor((now - dob) / 3.15576e+10);
}