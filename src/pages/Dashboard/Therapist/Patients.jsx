import React, { useEffect, useState } from "react";
import { useThemeContext } from "../../../hooks/useAppContext";
import { DataGrid } from "@mui/x-data-grid";
import { useAuthHeader } from "react-auth-kit";
import axios from "axios";
import { Typography } from "@mui/material";
import { PatientsTable } from "../../../utils/filterRows";
import Spanish from "../../../utils/locale";
import CustomGrid from "../../../components/Custom/CustomGrid";
import Decode from "../../../utils/decode";

const Patients = () => {
  const authHeader = useAuthHeader();
  const { theme } = useThemeContext();
  const token = authHeader().split(" ")[1];
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);
  const id = Decode(token).id;
  const [updated, setUpdated] = useState(false);

  useEffect(() => {
    const getPatients = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/pacientesT/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = res.data.data;
        const { columns, rows } = PatientsTable(data, updated, setUpdated);
        setRows(rows);
        setColumns(columns);
      } catch (error) {
        console.log(error);
      }
    };
    getPatients();
  }, [updated, id, token]);

  return (
    <div style={{ height: "80%", width: "100%" }}>
      <Typography
        sx={{
          fontSize: {
            xs: "h5.fontSize",
            sm: "h3.fontSize",
            md: "h3.fontSize",
            lg: "h3.fontSize",
            xl: "h3.fontSize",
          },
          color: theme.text,
        }}
      >
        Pacientes
      </Typography>
      <DataGrid
        {...rows}
        initialState={{
          ...rows.initialState,
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[10, 20, 50]}
        localeText={Spanish}
        rows={rows}
        slots={{
          toolbar: CustomGrid,
        }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
          },
        }}
        disableVirtualization
        disableColumnMenu
        columns={columns}
        sx={{
          width: {
            lg: "100%",
          },
          backgroundColor: theme.back,
          color: theme.text,
          "& .MuiDataGrid-columnHeaderTitle": {
            fontWeight: "bold",
          },
        }}
      />
    </div>
  );
};

export default Patients;
