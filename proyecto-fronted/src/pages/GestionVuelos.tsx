import VueloList from "../components/VueloList";
import { Toaster } from "react-hot-toast";

const GestionVuelos = () => {
    return (
        <div className="min-h-screen">
            <VueloList />
            <Toaster
                position="top-right"
                reverseOrder={false} />
        </div>
    );
};

export default GestionVuelos;
