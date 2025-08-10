import React, { useEffect, useState } from "react";
import { useThemeContext } from "../../../hooks/useAppContext";
import { DataGrid } from "@mui/x-data-grid";
import { useAuthHeader } from "react-auth-kit";
import axios from "axios";
import { Typography } from "@mui/material";
import { AllPatientsTable } from "../../../utils/filterRows";
import Spanish from "../../../utils/locale";
import CustomGrid from "../../../components/Custom/CustomGrid";
import { useParams, useLocation } from "react-router-dom";

const AllPatients = () => {
  const { id } = useParams();
  const authHeader = useAuthHeader();
  const { theme } = useThemeContext();
  const token = authHeader().split(" ")[1];
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);
  const [updated, setUpdated] = useState(false);
  const location = useLocation();

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
        const { columns, rows } = AllPatientsTable(data, updated, setUpdated);
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
            sm: "h4.fontSize",
            md: "h4.fontSize",
            lg: "h3.fontSize",
          },
          color: theme.text,
        }}
      >
        Pacientes de {location.state.nombre}
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
          height: "100%",
        }}
      />
    </div>
  );
};

export default AllPatients;
