<script>
    export let workoutName;
    export let imgSrc;
  </script>
  
  <div class="workoutCard">
    <div class="workoutHeader">
      <h1 class="workoutName">{workoutName}</h1>
    </div>
  
    <img class="workoutImg" src={imgSrc} alt={workoutName} />
    
    <button class="view-workout-btn">View Workout</button>
  </div>

  
  <style>
  .workoutHeader {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  
  .workoutCard {
    background-color: #f0f0f0;
    border: 0.0625rem solid #ccc; 
    padding: 0.625rem; 
    border-radius: 0.3125rem; 
    text-align: center;
    box-shadow: 0 0.125rem 0.3125rem rgba(0, 0, 0, 0.1); 
    width: 7.875rem; 
    height: 17.3125rem; 
  }
  
  
  .workoutCard:hover {
    transform: scale(1.1);
    box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.5); 
  }
  
  .workoutCard img {
    width: 6.25rem; 
    height: 6.25rem;
  }
  
  .workoutName {
    margin-top: 0.625rem; 
    font-size: 1.5rem;
    font-weight: bold;
    text-align: center;
  }
  
  .view-workout-btn {
    width: 100%;
    padding: 0.625rem;
    background-color: #636363; 
    color: #EEEEEE;  
    text-align: center;
    font-size: 0.875rem; 
    text-decoration: none;
    border-radius: 0 0 0.5rem 0.5rem;
    transform: translateY(50%);
    transition: transform 0.3s ease-in-out, 0.3s ease;
    opacity: 0;
  }
  
  .view-workout-btn:hover {
    background-color: #555555; 
  }
  .workoutCard:hover .view-workout-btn {
    transform: translateY(0);
    opacity: 1;
  }
  
  </style>