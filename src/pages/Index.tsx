import React, { useState, useEffect } from "react";
import RecognitionTicker from "@/components/RecognitionTicker";
import { getBonuses } from "@/services/bonusly";

interface Person {
  name: string;
  email: string;
  department: string;
  profile_pic_url: string;
}

interface Recognition {
  amount: number;
  reason_decoded: string;
  giver: Person;
  receiver: Person;
}

const Index = () => {
  const [recognitions, setRecognitions] = useState<Recognition[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // In a real application, this would be an API call
    const fetchRecognitions = async () => {
      try {
        const recognitions = await getBonuses();
        setRecognitions(recognitions);
        setLoading(false);
      } catch (err) {
        setError("Failed to load recognitions");
        setLoading(false);
      }
    };

    fetchRecognitions();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/30">
      <div className="max-w-5xl mx-auto p-4 sm:p-6">
        <header className="text-center mb-10 py-6">
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
            Recognition Ticker
          </h1>
          <p className="text-muted-foreground mt-2">
            Celebrating teammates supporting each other
          </p>
        </header>

        <div className="bg-white shadow-lg rounded-xl p-6 h-[70vh]">
          {loading ? (
            <div className="h-full flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : error ? (
            <div className="h-full flex flex-col items-center justify-center text-destructive">
              <p className="text-lg font-medium">{error}</p>
              <button
                className="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
                onClick={() => window.location.reload()}
              >
                Try Again
              </button>
            </div>
          ) : recognitions.length === 0 ? (
            <div className="h-full flex items-center justify-center text-muted-foreground">
              <p>No recognitions to display yet</p>
            </div>
          ) : (
            <RecognitionTicker recognitions={recognitions} speed={25} />
          )}
        </div>

        <footer className="mt-6 text-center text-sm text-muted-foreground">
          {/* <p>Real-time team recognition dashboard</p> */}
        </footer>
      </div>
    </div>
  );
};

export default Index;
