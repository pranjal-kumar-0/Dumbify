import styles from "./Leaderboard.module.css";

function LeaderBoard(){
    return(
        <>
            <div class="styles.leaderboard-container]">
                <div class={styles['leaderboard-Header']}>
                    <div class={styles['name']}>Name</div>
                    <div class={styles['score']}>Score</div>
                    <div class={styles['rank']}>Rank</div>
                </div>
                <div class={styles['leaderboard-row']}>
                    <div class={styles['name']}>QuizMaster</div>
                    <div class={styles['score']}>69</div>
                    <div class={styles['rank']}>1</div>
                </div>
                <div class={styles['leaderboard-row']}>
                    <div class={styles['name']}>Pookie</div>
                    <div class={styles['score']}>64</div>
                    <div class={styles['rank']}>2</div>
                </div>
                <div class={styles['leaderboard-row']}>
                    <div class={styles['name']}>Udontknowme</div>
                    <div class={styles['score']}>57</div>
                    <div class={styles['rank']}>3</div>
                </div>
                <div class={styles['leaderboard-row']}>
                    <div class={styles['name']}>HEHE</div>
                    <div class={styles['score']}>52</div>
                    <div class={styles['rank']}>4</div>
                </div>
                <div class={styles['leaderboard-row']}>
                    <div class={styles['name']}>Meow</div>
                    <div class={styles['score']}>42</div>
                    <div class={styles['rank']}>5</div>
                </div>
            </div>
        </>
    );
}

export default LeaderBoard;
