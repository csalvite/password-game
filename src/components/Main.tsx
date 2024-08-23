'use client';

import { getQuestions } from '@/api/main';
import { IQuestions } from '@/interfaces/main';
import { useEffect, useState } from 'react';
import Loader from './Loader';
import Card from './Card';
import { Box, TextField } from '@mui/material';
import { validators } from '@/utils/validator';

const Main = () => {
  const [questions, setQuestions] = useState<IQuestions[]>([]);
  const [correctQuestions, setCorrectQuestions] = useState<IQuestions[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const handleChangePass = (e: any) => {
    const { value } = e.target;

    const result = [];
    let foundInvalid = false;

    for (let i = 0; i < questions.length; i++) {
      const question = questions[i];
      const validator = validators[question.id];

      if (!foundInvalid && validator(value)) {
        // Si es válida y aún no se ha encontrado ninguna invalida, añadirla como válida
        result.push({
          ...question,
          isValid: true,
        });
      } else if (!foundInvalid) {
        // Si no es válida y es la primera que falla, añadirla como inválida
        result.push({
          ...question,
          isValid: false,
        });
        foundInvalid = true; // Marcar que ya hemos encontrado la primera inválida
      } else {
        // Si ya hemos encontrado una inválida, detener la validación
        break;
      }
    }

    setCorrectQuestions(result.reverse());
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
                <Card title={item.id} text={item.name} isValid={item.isValid} />
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
