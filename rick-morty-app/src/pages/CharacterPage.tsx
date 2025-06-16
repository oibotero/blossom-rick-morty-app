import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CharacterList from "../components/Character/CharacterList";
import CharacterDetails from "../components/Character/CharacterDetails";
import { ArrowLeft } from "lucide-react";

export default function CharacterPage() {
  const { id } = useParams();
  const characterId = id ? parseInt(id) : null;

  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const navigate = useNavigate();

  // Detectar si la vista es móvil en base al tamaño de ventana
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile(); // evaluación inicial
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Manejar selección de personaje (redirige en móvil, selecciona en desktop)
  const handleSelect = (id: number) => {
    if (isMobile) {
      navigate(`/character/${id}`);
    } else {
      setSelectedId(id);
    }
  };

  // Volver a la pantalla anterior (usado solo en mobile con un botón)
  const handleBack = () => {
    navigate(-1);
  };

  // Determinar qué personaje mostrar en detalles
  const visibleCharacterId = characterId ?? selectedId;

  return (
    <div className="h-screen flex flex-col">
      <div className="flex flex-1 overflow-hidden">
        {/* VISTA MÓVIL: mostrar solo lista o solo detalles */}
        {isMobile ? (
          characterId ? (
            // Vista de detalles en móvil
            <div className="w-full relative">
              <button
                type="button"
                onClick={handleBack}
                className="absolute top-4 left-4 z-10 bg-white rounded-full p-2 shadow"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div className="pt-16 px-6">
                <CharacterDetails characterId={characterId} />
              </div>
            </div>
          ) : (
            // Vista de lista en móvil
            <CharacterList
              onSelect={handleSelect}
              selectedId={visibleCharacterId}
            />
          )
        ) : (
          // VISTA DESKTOP: lista y detalles visibles simultáneamente
          <>
            <div className="w-1/3">
              <CharacterList
                onSelect={handleSelect}
                selectedId={visibleCharacterId}
              />
            </div>
            {visibleCharacterId && (
              <div className="w-2/3 relative pt-16 px-6">
                <CharacterDetails characterId={visibleCharacterId} />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
