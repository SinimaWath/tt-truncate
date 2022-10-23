import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react';
import { Truncate } from './index'

describe('Truncate', () => {
    describe('incorrect props', () => {
        it('should render nothing on element children', () => {
            const { container } = render(<Truncate tailLength={1}><div></div></Truncate>);

            expect(container.children.length).toBe(0);
        });
    });

    describe('"tailLength" optimization', () =>  {
        const baseStyle = { textOverflow: 'ellipsis', overflow: 'hidden', display: 'block', whiteSpace: 'nowrap' };

        it('should render text then tailLength = 0', async () => {
            render(<Truncate tailLength={0}>Text</Truncate>);

            const element = await screen.getByText('Text');
            expect(element).not.toBeNull();
            expect(element).toHaveStyle(baseStyle);
        });

        it('should render text then tailLength <= 0', async () => {
            render(<Truncate tailLength={-1}>Text</Truncate>);

            const element = await screen.getByText('Text');
            expect(element).not.toBeNull();
            expect(element).toHaveStyle(baseStyle);
        });

        it('should render text then tailLength = length', async () => {
            render(<Truncate tailLength={4}>Text</Truncate>);

            const element = await screen.getByText('Text');
            expect(element).not.toBeNull();
            expect(element).toHaveStyle(baseStyle);
        });

        it('should render text then tailLength >= length', async () => {
            render(<Truncate tailLength={4}>Text</Truncate>);

            const element = await screen.getByText('Text');
            expect(element).not.toBeNull();
            expect(element).toHaveStyle(baseStyle);
        });
    });

    describe('"title" prop', () => {
        it('should render component with title attr', () => {
            render(<Truncate tailLength={2} title={'Title'}>Text</Truncate>);

            expect(screen.queryByTitle('Title')).toBeInTheDocument();
        });

        it('should render component with title attr and tailLength <= 0', () => {
            render(<Truncate tailLength={-1} title={'Title'}>Text</Truncate>);

            expect(screen.queryByTitle('Title')).toBeInTheDocument();
        });

        it('should render component with title attr and tailLength = 0', () => {
            render(<Truncate tailLength={0} title={'Title'}>Text</Truncate>);

            expect(screen.queryByTitle('Title')).toBeInTheDocument();
        });

        it('should render component with title attr and tailLength >= length', () => {
            render(<Truncate tailLength={5} title={'Title'}>Text</Truncate>);

            expect(screen.queryByTitle('Title')).toBeInTheDocument();
        });

        it('should render component with title attr and tailLength >= length', () => {
            render(<Truncate tailLength={4} title={'Title'}>Text</Truncate>);

            expect(screen.queryByTitle('Title')).toBeInTheDocument();
        });
    })

    describe('"className" prop', () => {
        it('should render component with class attr', () => {
            const { container } = render(<Truncate tailLength={2} className={'className'}>Text</Truncate>);

            expect(container.querySelector('.className')).toBeInTheDocument();
        });

        it('should render component with class attr and tailLength <= 0', () => {
            const { container } = render(<Truncate tailLength={-1} className={'className'}>Text</Truncate>);

            expect(container.querySelector('.className')).toBeInTheDocument();
        });

        it('should render component with class attr and tailLength = 0', () => {
            const { container } = render(<Truncate tailLength={0} className={'className'}>Text</Truncate>);

            expect(container.querySelector('.className')).toBeInTheDocument();
        });

        it('should render component with class attr and tailLength >= length', () => {
            const { container } = render(<Truncate tailLength={4} className={'className'}>Text</Truncate>);

            expect(container.querySelector('.className')).toBeInTheDocument();
        });

        it('should render component with class attr and tailLength >= length', () => {
            const { container } = render(<Truncate tailLength={5} className={'className'}>Text</Truncate>);

            expect(container.querySelector('.className')).toBeInTheDocument();
        });
    })

    describe('truncate', () => {
        it('should truncate text for 2 elems', () => {
            const { container } = render(<Truncate tailLength={2}>Text</Truncate>);

            expect(container.childNodes[0].childNodes[0]).toHaveTextContent('Te');
            expect(container.childNodes[0].childNodes[1]).toHaveTextContent('xt');
        })
    })

    describe('clipboard', () => {
        it('should copy to clipboard selected text', async () => {
            const rawGetSelection = document.getSelection;

            document.getSelection = () => ({
                toString: () => {
                    return 'Text';
                }
            })

            const setData = jest.fn();
            render(<Truncate tailLength={2} title={'Title'}>Text</Truncate>);

            const element = await screen.getByTitle('Title');

            fireEvent.copy(element, {
                clipboardData: {
                    setData,
                }
            });

            expect(setData).toHaveBeenCalledWith('text/plain', 'Text')

            document.getSelection = rawGetSelection;
        });


        it('should copy to clipboard selected text without \n', async () => {
            const rawGetSelection = document.getSelection;

            document.getSelection = () => ({
                toString: () => {
                    return '\nText\n';
                }
            })

            const setData = jest.fn();
            render(<Truncate tailLength={2} title={'Title'}>Text</Truncate>);

            const element = await screen.getByTitle('Title');

            fireEvent.copy(element, {
                clipboardData: {
                    setData,
                }
            });

            expect(setData).toHaveBeenCalledWith('text/plain', 'Text')

            document.getSelection = rawGetSelection;
        })

        it('should copy to clipboard selected text without \xa0', async () => {
            const rawGetSelection = document.getSelection;

            document.getSelection = () => ({
                toString: () => {
                    return '\xa0Text\xa0';
                }
            })

            const setData = jest.fn();
            render(<Truncate tailLength={2} title={'Title'}>Text</Truncate>);

            const element = await screen.getByTitle('Title');

            fireEvent.copy(element, {
                clipboardData: {
                    setData,
                }
            });

            expect(setData).toHaveBeenCalledWith('text/plain', ' Text ')

            document.getSelection = rawGetSelection;
        })
    })
})