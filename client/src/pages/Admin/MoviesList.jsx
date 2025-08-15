import React, { useEffect, useState } from "react";
import Button from "../../components/Button";
import MovieForm from "./MovieForm";
import { message, Table } from "antd";
import { useDispatch } from "react-redux";
import { hideGlobalLoader, showGlobalLoader } from "../../redux/loadersSlice";
import { DeleteMovie, GetAllMovies } from "../../apicalls/movies";
import dayjs from "dayjs";


function MoviesList() {
    const [movies, setMovies] = useState([]);
    const [showMovieFormModal, setShowMovieFormModal] = React.useState(false);
    const [selectedMovie, setSelectedMovie] = React.useState(null);
    const [formType, setFormType] = React.useState("add");
    const dispatch = useDispatch();

    const getData = async () => {
        try {
            dispatch(showGlobalLoader());
            const response = await GetAllMovies();
            if (response.success) {
                setMovies(response.data);
            } else {
                message.error(response.message);
            }
        } catch (error) {
            message.error(error.message);
        } finally {
            dispatch(hideGlobalLoader());
        }
    };

    const handleDelete = async (movieId) => {
        try {
            dispatch(showGlobalLoader());
            const response = await DeleteMovie(movieId);
            if (response.success) {
                message.success(response.message);
                getData(); // Refresh the list
            } else {
                message.error(response.message);
            }
        } catch (error) {
            message.error(error.message);
        } finally {
            dispatch(hideGlobalLoader());
        }
    };


    const columns = [
        {
            title: "Poster",
            dataIndex: "poster",
            render: (text, record) => {
                return <img src={record.poster} alt="poster" width="60" height="80" className="br-1" />
            }
        },
        {
            title: "Name",
            dataIndex: "title",
        },
        {
            title: "Description",
            dataIndex: "description",
        },
        {
            title: "Duration",
            dataIndex: "duration",
        },
        {
            title: "Genre",
            dataIndex: "genre",
        },
        {
            title: "Language",
            dataIndex: "language",
        },
        {
            title: "Release Date",
            dataIndex: "releaseDate",
            render: (text, record) => {
                return dayjs(record.releaseDate).format("DD-MM-YYYY");
            }
        },
        {
            title: "Action",
            dataIndex: "action",
            render: (text, record) => {
                return <div className="flex gap-1">
                    <i className="ri-delete-bin-line"
                        onClick={() => { handleDelete(record._id) }}
                    ></i>
                    <i className="ri-pencil-line"
                        onClick={() => {
                            setSelectedMovie(record);
                            setFormType("edit");
                            setShowMovieFormModal(true);
                        }}
                    ></i>
                </div>
            }
        }
    ];

    useEffect(() => {
        getData();
    }, []);


    return (
        <div>
            <div className="flex justify-end mb-2">
                <Button
                    title="Add Movie"
                    variant="outlined"
                    onClick={() => {
                        setShowMovieFormModal(true);
                        setFormType("add");
                        setSelectedMovie(null);
                    }}
                />
            </div>

            <Table columns={columns} dataSource={movies} />

            {showMovieFormModal && (
                <MovieForm
                    showMovieFormModal={showMovieFormModal}
                    setShowMovieFormModal={setShowMovieFormModal}
                    selectedMovie={selectedMovie}
                    setSelectedMovie={setSelectedMovie}
                    formType={formType}
                    reloadData={getData}
                />
            )}
        </div>
    );
};

export default MoviesList;