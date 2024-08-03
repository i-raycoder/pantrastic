import Feed from "@components/Feed";
import Pantry from "@components/Pantry";

const Home = () => (
  <section className='w-full flex-center flex-col'>
    <h1 className='head_text text-center'>
    Organize, save, savor with Pantrastic.
      <br className='max-md:hidden' />
      <span className='twilight_gradient text-center'> Make your pantry fantastic!</span>
    </h1>
    <p className='desc text-center'>
    Pantrastic is your personal pantry assistant. Easily track your food items, plan meals, and reduce food waste.
    </p>


    <Feed />
  </section>
);

export default Home;
