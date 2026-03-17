import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsLetterBox from '../components/NewsLetterBox' 
const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'} />
      </div>
      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
        <p >Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate labore eveniet nihil nesciunt ut reiciendis ipsa voluptatem, suscipit obcaecati repudiandae unde ad fugit cum nobis?</p>
        <p >Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum quasi impedit asperiores, autem eum culpa. Aspernatur sunt, enim accusantium ipsam quaerat reprehenderit facilis qui omnis! Cum aut voluptates animi ipsa?</p>
        <b className='text-gray-800'>Our Mission</b>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Adipisci tempora ad odio explicabo nostrum modi architecto aperiam cumque molestias ab.</p>
        </div>
      </div>

      <div className='text-xl py-4'>
        <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>
      <div className='flex flex-col gap-4 md:flex-row text-sm mb-20'>

        <div className='border border-gray-400 rounded-2xl px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Quality Assurance</b>
          <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officiis error dolor fuga voluptatum cumque mollitia eligendi nemo minus, assumenda accusamus.</p>
        </div>

        <div className='border border-gray-400 rounded-2xl px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Convenience</b>
          <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officiis error dolor fuga voluptatum cumque mollitia eligendi nemo minus, assumenda accusamus. Lorem ipsum dolor sit amet.</p>
        </div>

        <div className='border border-gray-400 rounded-xl px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Exceptional Customer Service</b>
          <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officiis error dolor fuga voluptatum cumque mollitia eligendi nemo minus, assumenda accusamus. Lorem ipsum dolor sit amet.</p>
        </div>

      </div> 
      <NewsLetterBox/>
    </div>
  )
}

export default About