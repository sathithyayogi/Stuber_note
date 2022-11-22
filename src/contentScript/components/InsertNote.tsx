import React, { useState } from 'react'

type IInsertNote = {
    submitNote: (e:any,noteTxt: string) => void;
    defaultNote: any;
    placeHolder: string;
    hideCustomization?: boolean;
    firstNote?: boolean;
}

const InsertNote = ({ submitNote, defaultNote, placeHolder, hideCustomization = false, firstNote = false }: IInsertNote) => {
    const [tmpNote, setTmpNote] = useState<string>("");
    const [editNote, showEditNote] = useState<boolean>(false);
    return (
        <form>
            {
                !hideCustomization &&
                <>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>

                    {!editNote &&
                        <svg onClick={() => {
                            showEditNote(true);
                        }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                        </svg>
                    }
                </>
            }
            {
                (editNote || firstNote) &&
                
                <div className="mb-4 w-full bg-gray-50 rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600">
                        <p>{defaultNote.youtubeTimeStamp}</p>

                    <div className="py-2 px-4 bg-white rounded-t-lg dark:bg-gray-800">
                        <label className="sr-only">Your comment</label>
                        <textarea id="comment" rows={4} defaultValue={defaultNote.note} onChange={(e) => {
                            setTmpNote(e.target.value)
                        }} className="px-0 w-full text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400" placeholder={" Write your Note at " + placeHolder}></textarea>
                    </div>
                    <div className="flex flex-col items-end py-2 px-3 border-t dark:border-gray-600">
                        <div className="">
                            {
                                !firstNote &&
                                <button onClick={(e) => {
                                    showEditNote(false);
                                }} className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
                                    Cancel
                                </button>
                            }

                            <button onClick={(e) => {
                                submitNote(e,tmpNote);
                            }} className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
                                Post comment
                            </button>

                        </div>
                    </div>
                </div>
            }
            {
                !editNote &&
                <>
                    <div className="">
                        <p>{defaultNote.youtubeTimeStamp}</p>
                        <h5>{defaultNote.note}</h5>
                    </div>
                </>
            }
        </form>
    )
}

export default InsertNote