// File: src/pages/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { IoTrashBinOutline } from "react-icons/io5";
import { FaPowerOff } from "react-icons/fa6";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { MdOutlineFavorite } from "react-icons/md";

function Dashboard() {
    const [activeTab, setActiveTab] = useState('notes');
    const [notes, setNotes] = useState([]);
    const [tempNotes, setTempNotes] = useState([])
    const [bookmarks, setBookmarks] = useState([]);
    const [tempBookmarks, setTempBookmarks] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [bookmarkUrl, setBookmarkUrl] = useState('');
    const [bookmarkTitle, setBookmarkTitle] = useState('');
    const [bookmarkNote, setBookmarkNote] = useState('');
    const [toggle, setToggle] = useState(true)
    const [noteTitleErr, setnoteTitleErr] = useState('')
    const [noteContentErr, setNoteContentErr] = useState('')
    const [bookmarkUrlerr, setbookmarkUrlerr] = useState('')
    const [bookmarktitleerr, setbookmarktitleerr] = useState('')
    const [bookmarknoteerr, setbookmarknoteerr] = useState('')
    const [searchNoteText, setSearchNoteText] = useState('');
    const [searchBookText, setSearchBookText] = useState('');
    const [userid, setUserid] = useState(0)
    const [username, setUsername] = useState("")
    const navigate = useNavigate();

    useEffect(() => {
        const userrid = (localStorage.getItem('userid'))
        setUserid(userrid)
        const sernameeee = (localStorage.getItem('username'))
        setUsername(sernameeee)
    }, [])

    console.log(userid, "useriduseriduserid")

    useEffect(() => {
        const token = localStorage.getItem('token');
        async function getLocalData() {
            const userrid = await (localStorage.getItem('userid'))
            if (userrid == 0 || userrid == null || userrid == undefined) {
                navigate("/")
            }
            else {
                axios.get(`http://localhost:5000/getnotes/${userrid}`).then((res) => {
                    setNotes(res.data)
                    setTempNotes(res.data)
                })
                axios.get(`http://localhost:5000/getbookmarks/${userrid}`).then((res) => {
                    setBookmarks(res.data)
                    setTempBookmarks(res.data)
                })
            }
        }
        getLocalData()
        // const fetchData = async () => {
        //   const token = localStorage.getItem('token');
        //   const userId = JSON.parse(atob(token.split('.')[1])).userId;
        //   const headers = { Authorization: `Bearer ${token}` };

        //   const notesRes = await axios.get(`http://localhost:5000/api/notes/${userId}`, { headers });
        //   const bookmarksRes = await axios.get(`http://localhost:5000/api/bookmarks/${userId}`, { headers });

        //   setNotes(notesRes.data);
        //   setBookmarks(bookmarksRes.data);
        // };
        // fetchData();
    }, [toggle, userid, localStorage]);


    const handleAddNote = async () => {
        let flag = false
        // const token = localStorage.getItem('token');
        // const userId = JSON.parse(atob(token.split('.')[1])).userId;
        // const headers = { Authorization: `Bearer ${token}` };
        if (title == '' && content == '') {
            console.log(flag, "gggggggg")
            setnoteTitleErr("Title cannot be empty")
            setNoteContentErr("Content cannot be empty")
            flag = false
        }
        else if (title == '') {
            setnoteTitleErr("Title cannot be empty")
            flag = false
        }
        else if (content == '') {
            setNoteContentErr("Content cannot be empty")
            flag = false
        }
        else {
            console.log(flag, "flagflagflagflagflag")
            setnoteTitleErr('')
            setNoteContentErr('')
            flag = true
        }
        if (flag == true) {
            const userId = userid
            const newNote = { userId, title, content };
            const res = await axios.post('http://localhost:5000/addnote', newNote);
            setToggle(!toggle)
            setTitle('');
            setContent('');
        }
    };

    console.log(noteTitleErr, noteContentErr, "noteTitleErr,noteContentErrnoteTitleErr,noteContentErr")

    const handleAddBookmark = async () => {
        let flag = false
        // const token = localStorage.getItem('token');
        // const userId = JSON.parse(atob(token.split('.')[1])).userId;
        // const headers = { Authorization: `Bearer ${token}` };
        if (bookmarkUrl == '' && bookmarkTitle == '' && bookmarkNote == '') {
            console.log(flag, "gggggggg")
            setbookmarkUrlerr("URL cannot be empty")
            setbookmarktitleerr("Title cannot be empty")
            setbookmarknoteerr("Note cannot be empty")
            flag = false
        }
        else if (bookmarkUrl == '') {
            setbookmarkUrlerr("URL cannot be empty")
            flag = false
        }
        else if (bookmarkTitle == '') {
            setbookmarktitleerr("Title cannot be empty")
            flag = false
        }
        else if (bookmarkNote == '') {
            setbookmarknoteerr("Note cannot be empty")
            flag = false
        }
        else {
            console.log(flag, "flagflagflagflagflag")
            setbookmarkUrlerr("")
            setbookmarktitleerr("")
            setbookmarknoteerr("")
            flag = true
        }
        if (flag == true) {
            const userId = userid
            const newBookmark = {
                userId,
                url: bookmarkUrl,
                title: bookmarkTitle,
                note: bookmarkNote
            };
            const res = await axios.post('http://localhost:5000/addbookmark', newBookmark);
            setToggle(!toggle)
            setBookmarkUrl('');
            setBookmarkTitle('');
            setBookmarkNote('');
        }
    };

    function deleteNote(id) {
        axios.delete(`http://localhost:5000/deletenote/${id}`).then((res) => console.log(res))
        setToggle(!toggle)
    }

    function deleteBookmark(id) {
        axios.delete(`http://localhost:5000/deletebookmark/${id}`).then((res) => console.log(res))
        setToggle(!toggle)
    }

    useEffect(() => {
        if (searchNoteText == '') {
            setNotes(tempNotes)
        }
        const lowerSearch = searchNoteText.toLowerCase();
        const filteredData = tempNotes.filter(item =>
            item.title?.toString().toLowerCase().includes(lowerSearch)
        );
        setNotes(filteredData)
    }, [searchNoteText])

    useEffect(() => {
        if (searchBookText == '') {
            setBookmarks(tempBookmarks)
        }
        const lowerSearch = searchBookText.toLowerCase();
        const filteredData = tempBookmarks.filter(item =>
            item.title?.toString().toLowerCase().includes(lowerSearch)
        );
        setBookmarks(filteredData)
    }, [searchBookText])

    function handleSignout() {
        localStorage.clear();
        setToggle(!toggle)
    }

    async function markFavouraite(id) {
        axios.put(`http://localhost:5000/favnote/${id}`).then((res) => console.log(res))
        setToggle(!toggle)
    }

    function unmarkFavouraite(id) {
        axios.put(`http://localhost:5000/unfavnote/${id}`).then((res) => console.log(res))
        setToggle(!toggle)
    }
    async function markFavouraitebook(id) {
        axios.put(`http://localhost:5000/favbookmark/${id}`).then((res) => console.log(res))
        setToggle(!toggle)
    }

    function unmarkFavouraitebook(id) {
        axios.put(`http://localhost:5000/unfavbookmark/${id}`).then((res) => console.log(res))
        setToggle(!toggle)
    }
    return (
        <div className="p-6 bg-gray-900 min-h-screen text-white">
            <div className="mb-6 border-b border-blue-500 pb-2 flex justify-between">
                <h1 className='text-3xl font-bold'>Dashboard</h1>
                <p className='text-xl'><strong>Hey,</strong>{username} <button onClick={handleSignout}><FaPowerOff /></button></p>
            </div>

            {/* Tabs */}
            <div className="flex space-x-4 mb-6">
                <button
                    className={`px-4 py-2 rounded border ${activeTab === 'notes' ? 'border-blue-500 bg-blue-600 text-white' : 'border-blue-500 text-blue-400'}`}
                    onClick={() => setActiveTab('notes')}
                >
                    Notes
                </button>
                <button
                    className={`px-4 py-2 rounded border ${activeTab === 'bookmarks' ? 'border-blue-500 bg-blue-600 text-white' : 'border-blue-500 text-blue-400'}`}
                    onClick={() => setActiveTab('bookmarks')}
                >
                    Bookmarks
                </button>
            </div>

            {/* Notes Tab */}
            {activeTab === 'notes' && (
                <div>
                    <h2 className="text-xl font-semibold mb-2">Add Note</h2>
                    <input
                        className="block border border-blue-500 bg-gray-800 p-2 w-full mb-2 rounded text-white"
                        placeholder="Title"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    {
                        title == '' && noteTitleErr != '' ? <p className='text-red-500 pl-4 mb-2 text-sm'>{noteTitleErr}</p> : <></>
                    }
                    <textarea
                        className="block border border-blue-500 bg-gray-800 p-2 w-full mb-2 rounded text-white"
                        placeholder="Content"
                        value={content}
                        onChange={e => setContent(e.target.value)}
                    ></textarea>
                    {
                        content == '' && noteContentErr != '' ? <p className='text-red-500 pl-4 mb-2 text-sm'>{noteContentErr}</p> : <></>
                    }
                    <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-500" onClick={handleAddNote}>
                        Add Note
                    </button>
                    <h2 className="text-xl font-semibold mt-8 mb-2">My Notes</h2>
                    <div className="mb-4">
                        <input
                            className="block border border-blue-500 bg-gray-800 p-2 w-full rounded text-white"
                            placeholder="Search..."
                            value={searchNoteText}
                            onChange={e => setSearchNoteText(e.target.value)}
                        />
                    </div>
                    {notes.map(note => (
                        <div key={note._id} className="border border-blue-500 p-3 mb-4 rounded bg-gray-800">
                            <div style={{ float: "right" }} className='text-2xl flex gap-3'>
                                {
                                    note.favouraite == true ? <button onClick={() => unmarkFavouraite(note._id)}><MdOutlineFavorite /></button> : <button onClick={() => markFavouraite(note._id)}><MdOutlineFavoriteBorder /></button>
                                }
                                <button onClick={() => deleteNote(note._id)} style={{ float: "right" }}><IoTrashBinOutline /></button>
                            </div>

                            <h3 className="font-bold text-lg text-white">{note.title}</h3>
                            <p className="text-white">{note.description}</p>
                        </div>
                    ))}
                </div>
            )}

            {/* Bookmarks Tab */}
            {activeTab === 'bookmarks' && (
                <div>
                    <h2 className="text-xl font-semibold mb-2">Add Bookmark</h2>
                    <input
                        className="block border border-blue-500 bg-gray-800 p-2 w-full mb-2 rounded text-white"
                        placeholder="URL"
                        value={bookmarkUrl}
                        onChange={e => setBookmarkUrl(e.target.value)}
                    />
                    {
                        bookmarkUrl == '' && bookmarkUrlerr != '' ? <p className='text-red-500 pl-4 mb-2 text-sm'>{bookmarkUrlerr}</p> : <></>
                    }
                    <input
                        className="block border border-blue-500 bg-gray-800 p-2 w-full mb-2 rounded text-white"
                        placeholder="Title"
                        value={bookmarkTitle}
                        onChange={e => setBookmarkTitle(e.target.value)}
                    />
                    {
                        bookmarkTitle == '' && bookmarktitleerr != '' ? <p className='text-red-500 pl-4 mb-2 text-sm'>{bookmarktitleerr}</p> : <></>
                    }
                    <textarea
                        className="block border border-blue-500 bg-gray-800 p-2 w-full mb-2 rounded text-white"
                        placeholder="Note"
                        value={bookmarkNote}
                        onChange={e => setBookmarkNote(e.target.value)}
                    ></textarea>
                    {
                        bookmarkNote == '' && bookmarknoteerr != '' ? <p className='text-red-500 pl-4 mb-2 text-sm'>{bookmarknoteerr}</p> : <></>
                    }
                    <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500" onClick={handleAddBookmark}>
                        Add Bookmark
                    </button>

                    <h2 className="text-xl font-semibold mt-8 mb-2">My Bookmarks</h2>
                    <div className="mb-4">
                        <input
                            className="block border border-blue-500 bg-gray-800 p-2 w-full rounded text-white"
                            placeholder="Search..."
                            value={searchBookText}
                            onChange={e => setSearchBookText(e.target.value)}
                        />
                    </div>
                    {bookmarks.map(bm => (
                        <div key={bm._id} className="border border-blue-500 p-3 mb-4 rounded bg-gray-800">
                            <div style={{ float: "right" }} className='text-2xl flex gap-3'>
                                {
                                    bm.favouraite == true ? <button onClick={() => unmarkFavouraitebook(bm._id)}><MdOutlineFavorite /></button> : <button onClick={() => markFavouraitebook(bm._id)}><MdOutlineFavoriteBorder /></button>
                                }
                                <button onClick={() => deleteBookmark(bm._id)} style={{ float: "right" }}><IoTrashBinOutline /></button>
                            </div>
                            <a href={bm.url} target="_blank" rel="noreferrer" className="text-blue-400 underline">
                                {bm.title || bm.url}
                            </a>
                            <p className="text-white">{bm.description}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Dashboard;