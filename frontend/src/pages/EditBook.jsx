import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import { useSnackbar } from 'notistack'

const EditBook = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [publishYear, setPublishYear] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        setLoading(true);
        axios
            .get(`http://localhost:5000/books/${id}`)
            .then((response) => {
                setAuthor(response.data.author)
                setTitle(response.data.title)
                setPublishYear(response.data.publishYear)
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                alert('we got an error');
                console.log(error);
            });
    }, [])

    const handleEditBook = () => {
        const data = {
            title,
            author,
            publishYear,
        };
        setLoading(true);
        axios
            .put(`http://localhost:5000/books/${id}`, data)
            .then(() => {
                setLoading(false);
                enqueueSnackbar('Book Edited Successfully.', {variant: 'success'})
                navigate('/');
            })
            .catch((error) => {
                setLoading(false);
                alert('we got an error');
                enqueueSnackbar('we got an error.', {variant: 'error'})
                console.log(error);
            })
    };

    return (
        <div className='p-4  text-black'>
            <BackButton />
            <h1 className=' text-white text-3xl my-4'>Edit book</h1>
            {loading ? <Spinner /> : ''}
            <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
                <div className='my-4'>
                    <label className='text-xl mr-4 text-gray-500'>Title</label>
                    <input type='text' value={title} onChange={(e) => setTitle(e.target.value)} className='border-2 border-gray-500 px-4 py-2 w-full' />
                </div>
            </div>
            <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
                <div className='my-4'>
                    <label className='text-xl mr-4 text-gray-500'>Author</label>
                    <input type='text' value={author} onChange={(e) => setAuthor(e.target.value)} className='border-2 border-gray-500 px-4 py-2 w-full' />
                </div>
            </div>
            <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
                <div className='my-4'>
                    <label className='text-xl mr-4 text-gray-500'>Publish Year</label>
                    <input type='text' value={publishYear} onChange={(e) => setPublishYear(e.target.value)} className='border-2 border-gray-500 px-4 py-2 w-full' />
                </div>
            </div>
            <button className='p-2 bg-sky-300 m-8' onClick={handleEditBook}>
                Save
            </button>
        </div>
    )
}

export default EditBook