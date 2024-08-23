interface IProps {
  title: string;
  text: string;
  isValid: boolean;
}

const Card = ({ title, text, isValid }: IProps) => {
  return (
    <section
      className={`w-full md:w-[35rem] md:w-[40rem] flex flex-col gap-2 bg-[var(--color2)] rounded-md p-4 text-justify border border-black ${
        isValid ? 'bg-green-500' : 'bg-red-500'
      }`}
    >
      <h3 className='text-xl md:text-2xl'>{title}</h3>
      <p>{text}</p>
    </section>
  );
};

export default Card;
