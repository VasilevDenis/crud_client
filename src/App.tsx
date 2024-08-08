import React, { useEffect, useState } from 'react';
import './App.css';

interface Note {
    id: number;
    content: string;
}

const apiUrl = 'http://localhost:7070/notes';

const App: React.FC = () => {
    const [notes, setNotes] = useState<Note[]>([]);
    const [content, setContent] = useState<string>('');

    // Функция для загрузки заметок
    const loadNotes = async () => {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setNotes(data);
    };

    // Функция для добавления заметки
    const addNote = async (event: React.FormEvent) => {
        event.preventDefault();

        await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: 0, content }),
        });

        setContent('');
        loadNotes(); // Обновление списка заметок
    };

    // Функция для удаления заметки
    const deleteNote = async (id: number) => {
        await fetch(`${apiUrl}/${id}`, {
            method: 'DELETE',
        });
        loadNotes(); // Обновление списка заметок
    };

    useEffect(() => {
        loadNotes(); // Первоначальная загрузка заметок
    }, []);

    return (
        <div className='app'>
          <div className='header'>
            <h1 className="title">Заметки</h1>
            <button className='load' onClick={loadNotes}>&#128257;</button>
          </div>
            <div className='notes'>
                {notes.map((note) => (
                    <div className="note" key={note.id}>
                        <p>
                            {note.content} 
                            <button className='delete' onClick={() => deleteNote(note.id)}>✖</button>
                        </p>
                    </div>
                ))}
            </div>
            <form className="add-note" onSubmit={addNote}>
              <textarea rows={30} cols={100} value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Введите заметку"
                required              
              />
              <button className="add" type="submit">Добавить</button>
            </form>
        </div>
    );
};

export default App;
