import React from 'react';
import discountBg from '../../assets/aaa.jpg';
import { Link } from 'react-router';

const Discount = () => {
    return (
        <div className='my-20'>
            <div className='text-center my-10'>
                <p className='text-secondary text-lg'>Discount!</p>
                <h2 className='text-primary text-4xl font-bold'>Discount On All Super Selling Books</h2>
            </div>
            <div
                className="relative bg-cover bg-center rounded-xl p-10 my-10"
                style={{ backgroundImage: `url(${discountBg})` }}>

                <div className="flex flex-col items-center justify-center gap-10">
                    {/* Only text and button */}
                    <div className="text-center">
                        <p className="text-yellow-500 font-semibold text-lg mb-2">Get 25% Discount</p>
                        <h2 className="text-white text-4xl font-bold mb-4">
                            On All Super Selling Books
                        </h2>
                        <Link to="/books">
                            <button className="my-10 bg-white border-primary border py-2 px-10 rounded-lg text-primary font-bold hover:bg-secondary hover:text-white hover:border-secondary transform transition duration-300">
                                Shop Now
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Discount;
