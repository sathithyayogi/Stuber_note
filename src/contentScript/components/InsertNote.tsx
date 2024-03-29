import React, { useEffect, useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Badge from 'react-bootstrap/Badge';
import { playerSelectClassName } from '../../constants';
import { pauseYoutubeVideo, playAtParticularTimeStamp } from '../content.utils';

type IInsertNote = {
    submitNote?: (e: any, noteTxt: string) => void;
    updateNote?: (e: any, noteTxt: string, noteId: string) => void;
    deleteNote?: (e: any, noteId: string) => void;
    defaultNote: any;
    placeHolder: string;
    hideCustomization?: boolean;
    firstNote?: boolean;
}

const InsertNote = ({ submitNote, updateNote, deleteNote, defaultNote, placeHolder, hideCustomization = false, firstNote = false }: IInsertNote) => {
    const formRef = useRef();
    const [tmpNote, setTmpNote] = useState<string>("");
    const [editNote, showEditNote] = useState<boolean>(false);
    const [videoTitle, setVideoTitle] = useState('');


    useEffect(() => {
        setInterval(() => {
            const youtubeVideTitle = document.title;
            setVideoTitle(youtubeVideTitle)
        }, 1000)
    }, [])

    return (
        <form ref={formRef}>
            {
                (editNote || firstNote) &&
                <>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>

                            {/* <p style={{ fontSize: '18px', fontWeight: 'bold' }}> {videoTitle}</p> */}
                        </div>
                    </div>
                    <Form.Control
                        onFocusCapture={() => {
                            pauseYoutubeVideo();
                        }}
                        id="comment"
                        onChange={(e) => {
                            setTmpNote(e.target.value)
                        }}
                        defaultValue={defaultNote.note}
                        as="textarea"
                        placeholder={placeHolder ? "Write your Note at " + placeHolder : 'Write your Note Here!'}
                        style={{ 
                        height: '100px',
                        width:'100%'
                    }}
                    />
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '5px' }}>
                        {
                            !firstNote &&
                            <Button
                                style={{ marginLeft: '10px', marginRight: '10px' }}
                                onClick={(e) => {
                                    showEditNote(false);
                                }}
                                variant="secondary" size="sm">
                                Cancel
                            </Button>
                        }
                        <Button
                            onClick={(e) => {
                                if (firstNote) {
                                    // @ts-ignore
                                    formRef?.current.reset();
                                    submitNote(e, tmpNote);
                                } else {
                                    updateNote(e, tmpNote, defaultNote?.genId);
                                    showEditNote(false);
                                }
                            }}
                            variant="primary" size="sm">
                            {firstNote ? "Add Comment" : "Edit Comment"}
                        </Button>
                    </div>
                </>
            }
            {
                !hideCustomization &&
                <>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                        <div className="" onClick={()=>{
                            playAtParticularTimeStamp(defaultNote.youtubeTimeStamp);
                        }}>
                            <Badge style={{}} bg="primary">{defaultNote.youtubeTimeStamp}</Badge>{' '}
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <svg onClick={(e) => {
                                deleteNote(e, defaultNote?.genId);
                            }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="" style={{ width: '20px', height: '20px' }}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg>

                            {!editNote &&

                                <svg onClick={() => {
                                    showEditNote(true);
                                }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="" style={{ width: '20px', height: '20px' }}>
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                                </svg>

                            }
                        </div>
                    </div>
                </>
            }
            {
                (!editNote && !firstNote) &&
                <>

                    <div style={{ backgroundColor: '#f8f9fa', padding: '10px', marginBottom: '10px', marginTop: '10px' }}>
                        <h5>{defaultNote.note}</h5>
                    </div>
                </>
            }
        </form>
    )
}

export default InsertNote



