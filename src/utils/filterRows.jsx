import { Dates, Genre, Time } from "./dataNormalized";
import {
  CustomActions,
  CustomActionsTherapist,
  CustomActionsOrganization,
} from "../components/Custom/CustomActions";

export function PatientsTable(data, updated, setUpdated) {
  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "nombre", headerName: "Nombre", width: 300 },
    {
      field: "fechaNacimiento",
      headerName: "Fecha de Nacimiento",
      width: 250,
      valueFormatter: (params) => Dates(params.value),
    },
    {
      field: "sexo",
      headerName: "Sexo",
      width: 150,
      valueFormatter: (params) => Genre(params.value),
    },
    { field: "diagnostico", headerName: "Diagnóstico", width: 200 },
    {
      field: "operaciones",
      headerName: "Opciones",
      width: 200,
      renderCell: (params) => params.value,
    },
  ];

  const rows = data.map((row) => {
    return {
      id: row.id,
      nombre: row.nombre + " " + row.aPaterno + " " + row.aMaterno,
      fechaNacimiento: row.fechaNacimiento,
      sexo: row.sexo,
      diagnostico: row.diagnostico,
      operaciones: (
        <CustomActions row={row} updated={updated} setUpdated={setUpdated} />
      ),
    };
  });

  return { columns, rows };
}

export function AllPatientsTable(data, updated, setUpdated) {
  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "nombre", headerName: "Nombre", width: 300 },
    {
      field: "fechaNacimiento",
      headerName: "Fecha de Nacimiento",
      width: 250,
      valueFormatter: (params) => Dates(params.value),
    },
    {
      field: "sexo",
      headerName: "Sexo",
      width: 150,
      valueFormatter: (params) => Genre(params.value),
    },
    { field: "diagnostico", headerName: "Diagnóstico", width: 200 },
    {
      field: "operaciones",
      headerName: "Opciones",
      width: 250,
      renderCell: (params) => params.value,
    },
  ];

  const rows = data.map((row) => {
    return {
      id: row.id,
      nombre: row.nombre + " " + row.aPaterno + " " + row.aMaterno,
      fechaNacimiento: row.fechaNacimiento,
      sexo: row.sexo,
      diagnostico: row.diagnostico,
      operaciones: (
        <CustomActionsOrganization row={row} updated={updated} setUpdated={setUpdated} />
      ),
    };
  });

  return { columns, rows };
}

export function TherapistsTable(data, updated, setUpdated) {
  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "nombre", headerName: "Nombre", width: 300 },
    {
      field: "createdAt",
      headerName: "Fecha de Afiliacion",
      width: 250,
      valueFormatter: (params) => Dates(params.value),
    },
    {
      field: "lastLogin",
      headerName: "Ultimo Acceso",
      width: 250,
      valueFormatter: (params) =>
        Dates(params.value) + " " + Time(params.value),
    },
    { field: "email", headerName: "Email", width: 200 },
    { field: "telefono", headerName: "Telefono", width: 200 },
    {
      field: "operaciones",
      headerName: "Opciones",
      width: 200,
      renderCell: (params) => params.value,
    },
  ];

  const rows = data.map((row) => {
    return {
      id: row.id,
      nombre: row.nombre + " " + row.aPaterno + " " + row.aMaterno,
      createdAt: row.createdAt,
      lastLogin: row.lastLogin,
      telefono: row.telefono,
      email: row.email,
      operaciones: (
        <CustomActionsTherapist
          row={row}
          updated={updated}
          setUpdated={setUpdated}
        />
      ),
    };
  });

  return { columns, rows };
}
