import { fireEvent, render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import EmailPage from '../pages/EmailPage';
import EmailForm from '../components/EmailForm';

describe('EmailPage', () => {
    it('should render', () => {
        render(<EmailPage navigate={() => {}} />);
        expect(screen.getByText('Enter your email to get the quiz')).toBeInTheDocument();
    });
});

describe('EmailForm', () => {
    it('should render', () => {
        render(<EmailForm email="test@test.com" onSubmit={() => {}} />);
        expect(screen.getByDisplayValue('test@test.com')).toBeInTheDocument();
    });
    it('submit button should be disabled if email is empty', () => {
        render(<EmailForm email="" onSubmit={() => {}} />);
        expect(screen.getByText('Submit')).toBeDisabled();
    });
    it('submit button should be disabled if email is not valid', () => {
        render(<EmailForm email="test@test" onSubmit={() => {}} />);
        expect(screen.getByText('Submit')).toBeDisabled();
    });
    it('submit button should be enabled if email is valid', () => {
        render(<EmailForm email="test@test.com" onSubmit={() => {}} />);
        expect(screen.getByText('Submit')).toBeEnabled();
    });
    it('should submit', () => {
        const onSubmitMock = vi.fn();
        render(<EmailForm email="test@test.com" onSubmit={onSubmitMock} />);
        fireEvent.click(screen.getByText('Submit'));
        expect(onSubmitMock).toHaveBeenCalledWith('test@test.com');
    });
});
