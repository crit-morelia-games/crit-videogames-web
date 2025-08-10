import React, { useEffect, useState } from "react";
import { useThemeContext } from "../../../hooks/useAppContext";
import { DataGrid } from "@mui/x-data-grid";
import { useAuthHeader } from "react-auth-kit";
import axios from "axios";
import { Typography, Button } from "@mui/material";
import { TherapistsTable } from "../../../utils/filterRows";
import Spanish from "../../../utils/locale";
import CustomGrid from "../../../components/Custom/CustomGrid";
import ModalTherapist from "../../../components/Modal/ModalTherapist.jsx";

const Therapists = () => {
  const authHeader = useAuthHeader();
  const { theme } = useThemeContext();
  const token = authHeader().split(" ")[1];
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);
  const [open, setOpen] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [rowSelectionModel, setRowSelectionModel] = useState([]);

  useEffect(() => {
    const getTherapists = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/terapeutas`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = res.data.data;
        const { columns, rows } = TherapistsTable(data, updated, setUpdated);
        setRows(rows);
        setColumns(columns);
      } catch (error) {
        console.log(error);
      }
    };
    getTherapists();
  }, [updated]);

  return (
    <div>
      {open && <ModalTherapist open={open} setOpen={setOpen} />}
      <div style={{ width: "100%", height: "80%" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
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
            Terapeutas
          </Typography>
          <Button
            variant="contained"
            color="warning"
            sx={{ marginLeft: "10%" }}
            onClick={() => setOpen(true)}
          >
            Agregar Terapeuta
          </Button>
        </div>
        <DataGrid
          {...rows}
          rows={rows}
          columns={columns}
          checkboxSelection={false}
          disableSelectionOnClick={true}
          onRowSelectionModelChange={(newRowSelectionModel) => {
            setRowSelectionModel(newRowSelectionModel);
          }}
          pageSize={10}
          localeText={Spanish}
          components={{
            Toolbar: CustomGrid,
          }}
          disableVirtualization
          disableColumnMenu
          sx={{
            width: {
              lg: "90%",
            },
            backgroundColor: theme.back,
            color: theme.text,
            "& .MuiDataGrid-columnHeaderTitle": {
              fontWeight: "bold",
            },
          }}
        />
      </div>
    </div>
  );
};

export default Therapists;
