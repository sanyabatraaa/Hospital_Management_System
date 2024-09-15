

const Biography = ({imageUrl}) => {
  return (
    <div className="container biography">
      <div className="banner">
        <img src={imageUrl} alt="aboutImg"></img>
      </div>
      <div className="banner">
        <p>Biography</p>
        <h3>Who We Are?</h3>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magnam, ipsam perspiciatis debitis reiciendis odio adipisci eius provident ducimus saepe quasi, impedit excepturi voluptates accusamus, ratione quia doloribus. Esse ipsum, repudiandae enim quae sunt voluptate voluptates rerum dolores commodi facilis doloribus numquam quaerat ex aliquid illum? Accusamus illo alias itaque fugiat?
        </p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, assumenda!</p>
        <p>Lorem ipsum dolor sit amet.</p>
      </div>
    </div>
  )
}

export default Biography