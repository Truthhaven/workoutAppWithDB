<script>
    import { onMount } from 'svelte';
    import axios from 'axios';
    import WorkoutCard from '../componets/workoutCard.svelte';  
    /**
   * @type {any[]}
   */
    let workouts = [];
  
    // Fetch workouts when the component is mounted
    onMount(async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/workouts');
        workouts = response.data;
      } catch (error) {
        console.error('Error fetching workouts:', error);
      }
    });
  </script>
  
  <h1>Featured Workouts</h1>
  
  {#if workouts.length === 0}
    <p>No workouts available.</p>
  {/if}
  
  <div class="workout-list">
    {#each workouts as workout}
      <WorkoutCard
        workoutName={workout.name}
        imgSrc={workout.images && workout.images.length > 0 ? workout.images[0].image : 'https://via.placeholder.com/100?text=No+Image'}
      />
    {/each}
  </div>
  
  <style>
    .workout-list {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 20px;
    }
  </style>
  