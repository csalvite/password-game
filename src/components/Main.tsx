'use client';

import { getQuestions } from '@/api/main';
import { IQuestions } from '@/interfaces/main';
import { useEffect, useState } from 'react';
import Loader from './Loader';
import Card from './Card';
import { Box, TextField } from '@mui/material';

const Main = () => {
  const [questions, setQuestions] = useState<IQuestions[]>([]);
  const [correctQuestions, setCorrectQuestions] = useState<IQuestions[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const evaluateCondition = (condition: string, value: string) => {
    // Usa eval para evaluar la condición
    try {
      // Se evalúa en un contexto donde `value` es la variable local
      return eval(condition);
    } catch (error) {
      console.error('Error al evaluar la condición:', error);
      return false;
    }
  };

  const handleChangePass = (e: any) => {
    const { value } = e.target;
    console.log('Cambia la contraseña por: ', value);

    const correct = questions.filter((question) => {
      if (question.check) {
        // Evaluar la condición con la contraseña actual
        return evaluateCondition(question.check, value);
      }
      return false;
    });

    setCorrectQuestions(correct);
  };

  useEffect(() => {
    const getQ = async () => {
      try {
        setLoading(true);
        const res = await getQuestions();

        setQuestions(res);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    getQ();
  }, []);

  console.log('correct questions: ', correctQuestions);

  const render = () => {
    if (loading) {
      return (
        <section className='w-full h-full flex items-center justify-center'>
          <Loader className='w-16 h-16' />
        </section>
      );
    }

    if (error) {
      return (
        <section className='w-full h-full flex items-center justify-center'>
          <p>Ha ocurrido un error :(</p>
        </section>
      );
    }

    return (
      <>
        <h1 className='text-3xl text-center'>The Password Game</h1>
        <textarea
          name='pass'
          className='w-full md:w-[35rem] xl:w-[40rem] rounded-md p-2 text-black text-xl'
          placeholder='Introduce tu contraseña...'
          onChange={handleChangePass}
        />
        <section className=' flex flex-col items-center gap-8'>
          {correctQuestions.length > 0 &&
            correctQuestions.map((item) => (
              <article
                key={item.id}
                className='w-full md:w-[35rem] md:w-[40rem]'
              >
                <Card title={item.id} text={item.name} isValid={true} />
              </article>
            ))}
        </section>
      </>
    );
  };

  return (
    <main className='w-full h-full flex flex-col items-center gap-8 px-4 py-24 md:p-16'>
      {render()}
    </main>
  );
};

export default Main;
