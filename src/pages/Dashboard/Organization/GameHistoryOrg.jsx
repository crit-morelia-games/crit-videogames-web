import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useThemeContext } from "../../../hooks/useAppContext";
import { DataGrid } from "@mui/x-data-grid";
import { useAuthHeader } from "react-auth-kit";
import axios from "axios";
import { Typography, Box, Chip } from "@mui/material";
import Spanish from "../../../utils/locale";
import CustomGrid from "../../../components/Custom/CustomGrid";
import { Dates } from "../../../utils/dataNormalized";

const GameHistoryOrg = () => {
  const authHeader = useAuthHeader();
  const { theme } = useThemeContext();
  const { id } = useParams();
  const location = useLocation();
  const token = authHeader().split(" ")[1];
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const patientName = location.state?.nombre || "Paciente";

  const columns = [
    { 
      field: "id", 
      headerName: "ID Partida", 
      width: 120 
    },
    {
      field: "miniJuego",
      headerName: "Mini Juego",
      width: 150,
      valueGetter: (params) => params.row.miniJuego?.miniJuego || "No especificado",
    },
    {
      field: "extremidad",
      headerName: "Extremidad",
      width: 180,
      valueGetter: (params) => params.row.extremidad?.extremidad || "No especificado",
    },
    {
      field: "dificultad",
      headerName: "Dificultad",
      width: 120,
      renderCell: (params) => (
        <Chip 
          label={`Nivel ${params.value}`} 
          color={params.value === 1 ? "success" : params.value === 2 ? "warning" : "error"} 
          variant="outlined" 
          size="small"
        />
      ),
    },
    {
      field: "createdAt",
      headerName: "Fecha",
      width: 150,
      valueFormatter: (params) => Dates(params.value),
    },
    {
      field: "tiempo",
      headerName: "Duración (seg)",
      width: 150,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
          {params.value ? `${params.value}s` : "N/A"}
        </Box>
      ),
    },
    {
      field: "puntuacion",
      headerName: "Puntuación",
      width: 120,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
          {params.value || 0}
        </Box>
      ),
    },
    {
      field: "detalles",
      headerName: "Detalles del Juego",
      width: 200,
      renderCell: (params) => {
        const futKidsData = params.row.FootballGame;
        if (futKidsData) {
          const totalAtajadas = futKidsData.atajadasAbajo + futKidsData.atajadasArriba + futKidsData.atajadasEnMedio;
          const totalGoles = futKidsData.golesAbajo + futKidsData.golesArriba + futKidsData.golesEnMedio;
          return (
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%', fontSize: '0.8rem' }}>
              <span>Atajadas: {totalAtajadas}</span>
              <span>Goles: {totalGoles}</span>
            </Box>
          );
        }
        return <span>-</span>;
      },
    },
  ];

  useEffect(() => {
    const getGameHistory = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/partidasP/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        
        const data = res.data.data || [];
        setRows(data);
      } catch (error) {
        console.error("Error al obtener el historial de partidas:", error);
        setRows([]);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      getGameHistory();
    }
  }, [id, token]);

  return (
    <Box sx={{ height: "80%", width: "100%" }}>
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
          mb: 2,
        }}
      >
        Historial de Partidas - {patientName}
      </Typography>
      
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[10, 20, 50]}
        localeText={Spanish}
        loading={loading}
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
        sx={{
          width: "100%",
          backgroundColor: theme.back,
          color: theme.text,
          "& .MuiDataGrid-columnHeaderTitle": {
            fontWeight: "bold",
          },
        }}
      />
    </Box>
  );
};

export default GameHistoryOrg;
