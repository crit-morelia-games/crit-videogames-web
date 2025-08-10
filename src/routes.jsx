import { House, Groups, Badge } from "@mui/icons-material";
import { Home, Patients, Therapists, GameHistory, GameHistoryOrg } from "./pages/Dashboard";
import { Filters } from "./utils/filters";
import AllPatients from "./pages/Dashboard/Organization/AllPatients";

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        path: "/home",
        name: "Inicio",
        icon: <House />,
        component: <Home />,
        rol: Filters.ROLE_ALL,
      },
      {
        path: "/patients",
        name: "Pacientes",
        icon: <Groups />,
        component: <Patients />,
        rol: Filters.ROLE_THERAPIST,
      },
      {
        path: "/therapists",
        name: "Terapeutas",
        icon: <Badge />,
        component: <Therapists />,
        rol: Filters.ROLE_ORGANIZATION,
      },
    ],
  },
  {
    layout: "organization",
    pages: [
      {
        path: "/allPatients/:id",
        name: "PacientesPorTerapeuta",
        component: <AllPatients />,
        rol: Filters.ROLE_ORGANIZATION,
      },
      {
        path: "/gameHistoryOrg/:id",
        name: "HistorialPartidasOrg",
        component: <GameHistoryOrg />,
        rol: Filters.ROLE_ORGANIZATION,
      },
    ],
  },
  {
    layout: "therapist",
    pages: [
      {
        path: "/gameHistory/:id",
        name: "HistorialPartidas",
        component: <GameHistory />,
        rol: Filters.ROLE_ALL,
      },
    ],
  },
];

export default routes;
