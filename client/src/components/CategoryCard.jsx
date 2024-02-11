import PropTypes from 'prop-types';

const CategoryCard = ({img, name, count}) => {
  return (
    <div className='border border-blue-600 hover:border-blue-800 hover:scale-105 transition-transform rounded-lg'>
      <div className="felx justify-between items-center p-6">
        <div className="space-y-4">
            <h3 className="font-meduim text-xl">{name}</h3>
            <p className='text-gray-500'>{count}</p>
        </div>

      </div>
    </div>
  )
}

CategoryCard.propTypes = {
    img: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    count: PropTypes.string.isRequired,
};

export default CategoryCard

