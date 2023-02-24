export default function BreedList({Breeds}){
  const imageBaseurl = "https://cdn2.thedogapi.com/images/";
  
  if(Breeds.length == 0) return <h2 className='text-center'>No Matching Records Found.</h2>;
  return (
    Breeds.map(breed => (
      <div key={breed.id} className="card" style={{width: "18rem"}}>
        { breed.image ? 
          <img src={breed.image.url} className="card-img-top loading" alt={breed.bred_for} loading="lazy"/> :
          <img src={imageBaseurl+breed.reference_image_id+'.jpg'} className="card-img-top loading" alt={breed.bred_for} loading="lazy"/>
        }
        <div className="card-body">
          <h5 className="card-title">{breed.name}</h5>
          <p className="card-text">{breed.temperament}</p>
          <h6><span className="badge bg-primary">{breed.life_span}</span></h6>
          <h6><span className="badge bg-primary">{breed.bred_for}</span></h6>
        </div>
      </div>
    ))
  )
}