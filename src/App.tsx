import { useContext, useEffect } from 'react';
import EmailPage from './features/quiz/pages/EmailPage';
import QuizPage from './features/quiz/pages/QuizPage';
import SubmittedQuiz from './features/quiz/pages/SubmittedQuiz';
import NotFound from './features/quiz/pages/NotFound';
import { PagePaths } from './shared/types';
import NavigationProvider from './shared/components/NavigationProvider';
import Route from './shared/components/Route';
import { NavigationContext } from './shared/components/NavigationProvider';

function AppRoutes() {
    const { navigate, currentPath } = useContext(NavigationContext);

    const quizId = (() => {
        if (currentPath.startsWith(PagePaths.QUIZ)) {
            const pathParts = currentPath.split('/');
            return pathParts[2] || '1';
        }
        return '1';
    })();

    useEffect(() => {
        if (currentPath.startsWith(PagePaths.QUIZ)) {
            const pathParts = currentPath.split('/');
            if (!pathParts[2] || isNaN(parseInt(pathParts[2]))) {
                navigate(`${PagePaths.QUIZ}/1`);
            }
        }
    }, [currentPath, navigate]);

    const handleSetQuizId = (newQuizId: string) => {
        navigate(`${PagePaths.QUIZ}/${newQuizId}`);
    };

    const isValidPath = Object.values(PagePaths).includes(currentPath as PagePaths);

    return (
        <>
            <Route href={PagePaths.QUIZ}>
                <QuizPage quizId={quizId} navigate={navigate} setQuizId={handleSetQuizId} />
            </Route>
            <Route href={PagePaths.EMAIL}>
                <EmailPage navigate={navigate} />
            </Route>
            <Route href={PagePaths.SUBMITTED}>
                <SubmittedQuiz navigate={navigate} />
            </Route>
            <Route href={PagePaths.NOT_FOUND}>
                <NotFound navigate={navigate} />
            </Route>
            {!isValidPath && <NotFound navigate={navigate} />}
        </>
    );
}

function App() {
    return (
        <NavigationProvider>
            <AppRoutes />
        </NavigationProvider>
    );
}

export default App;
