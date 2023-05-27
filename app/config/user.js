let patientID = 1;
let patientName = '';

export function setPatientID(newID) {
    patientID = newID;
}

export function getPatientID() {
  return patientID;
}

export function setPatientName(newName) {
    patientName = newName;
}

export function getPatientName() {
  return patientName;
}