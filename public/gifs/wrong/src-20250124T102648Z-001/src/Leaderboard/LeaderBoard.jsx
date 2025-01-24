import { useEffect, useState } from "react";
import { db } from "../firebase"; // Import your Firebase configuration
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import styles from "./Leaderboard.module.css";

function LeaderBoard() {
    const [leaderboardData, setLeaderboardData] = useState([]);

    // Fetch leaderboard data from Firestore
    useEffect(() => {
        const fetchLeaderboardData = async () => {
            try {
                const quizResultsRef = collection(db, "quiz_results");
                const q = query(quizResultsRef, orderBy("correctCount", "desc"));
                const querySnapshot = await getDocs(q);

                const leaderboard = [];
                querySnapshot.forEach((doc) => {
                    leaderboard.push({ id: doc.id, ...doc.data() });
                });

                // Log the fetched data to check for duplicates
                console.log("Fetched leaderboard data:", leaderboard);

                // Check if the data is already in state to prevent adding duplicates
                setLeaderboardData(leaderboard);
            } catch (error) {
                console.error("Error fetching leaderboard data:", error);
            }
        };

        fetchLeaderboardData();
    }, []);

    return (
        <div className="max-w-7xl mx-auto">
            <div className={styles['leaderboard-header']}>
                <div className={styles['name']}>Name</div>
                <div className={styles['score']}>Score</div>
                <div className={styles['rank']}>Rank</div>
            </div>

            {leaderboardData.length === 0 ? (
                <p>No leaderboard data available</p>
            ) : (
                leaderboardData.map((player, index) => (
                    <div key={player.id} className={styles['leaderboard-row']}>
                        <div className={styles['name']}>{player.username}</div>
                        <div className={styles['score']}>{player.correctCount}</div>
                        <div className={styles['rank']}>{index + 1}</div>
                    </div>
                ))
            )}
        </div>
    );
}

export default LeaderBoard;
