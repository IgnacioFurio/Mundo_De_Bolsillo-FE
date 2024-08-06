import React, { useEffect } from 'react'
import { knowledgeData } from '../../services/knowledge.slice';
import { useSelector } from 'react-redux';

export const KnowledgeDetails = () => {

    const knowledgeRdx = useSelector(knowledgeData);

    useEffect(() => {console.log(knowledgeRdx);},[knowledgeRdx]);

    return (
        <h1>KnowledgeDetails</h1>
    )
}
