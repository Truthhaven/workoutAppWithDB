<script>
    import { onMount } from 'svelte';
    import axios from 'axios';
  
    /**
   * @type {any[]} 
   */
    let workouts = [];
  
    // Fetch workouts when the component is mounted
    onMount(async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/workouts');
        console.log(response.data);  // Log the response data for debugging
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
  
  <ul>
    {#each workouts as workout}
      <li>
        <h2>{workout.name}</h2>
        <p>{@html workout.description}</p>
  
        <!-- Muscles Involved -->
        {#if Array.isArray(workout.muscles) && workout.muscles.length > 0}
          <h3>Muscles Involved:</h3>
          <ul>
            {#each workout.muscles as muscle}
              <li>{muscle.name_en}</li>
            {/each}
          </ul>
        {:else}
          <p>No muscles listed.</p>
        {/if}
  
        <!-- Image -->
        {#if Array.isArray(workout.images) && workout.images.length > 0}
          <h3>Image:</h3>
          <img src={workout.images[0].image} alt="Workout Image" width="200" />
        {:else}
          <p>No images available.</p>
        {/if}
  
       <!-- Render Videos -->
      {#if Array.isArray(workout.videos) && workout.videos.length > 0}
      <h3>Videos:</h3>
      {#each workout.videos as video}
        <video width="320" height="240" controls>
          <source src={video.video} type="video/mp4" />  <!-- Access the video URL here -->
          Your browser does not support the video tag.
        </video>
      {/each}
    {:else}
      <p>No videos available.</p>
    {/if}
  </li>
{/each}
</ul>
  