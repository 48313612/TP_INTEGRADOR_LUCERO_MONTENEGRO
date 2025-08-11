import React, { useState } from 'react';
import EventoCard from './EventoCard';
import { Pagination } from './Pagination';
import '../css/styles.css';

export const ListEventos = ({ eventos }) => {
    const [eventosPerPage] = useState(4);
    const [currentPage, setCurrentPage] = useState(1);

    const indexOfLastEvento = currentPage * eventosPerPage;
    const indexOfFirstEvento = indexOfLastEvento - eventosPerPage;
    const currentEventos = eventos.slice(indexOfFirstEvento, indexOfLastEvento);

    return (
        <>
            <div className="eventos-list">
                {currentEventos.length === 0 ? (
                    <p>No hay eventos para mostrar.</p>
                ) : (
                    currentEventos.map((evento) => (
                        <EventoCard key={evento.id} evento={evento} />
                    ))
                )}
            </div>

            <Pagination
                eventosPerPage={eventosPerPage}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalEventos={eventos.length}
            />
        </>
    );
};
