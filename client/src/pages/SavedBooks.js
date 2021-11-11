import React, { useState, useEffect } from 'react';

import { useQuery, useMutation } from '@apollo/client';
import { GET_PROFILE} from "../utils/gql/queries";
import { REMOVE_BOOK } from "../utils/gql/mutations";
import Auth from '../utils/auth';
import { removeBookId } from '../utils/localStorage';

import {Jumbotron,Container,Card,CardColumns,Button} from 'react-bootstrap';

const SavedBooks = () => {

	const [deleteBook] = useMutation(REMOVE_BOOK);
	const [userProfile, setUserProfile] = useState({});
	
	//get id from user profile to query single user
	const {data: { _id }} = Auth.getProfile();
	const { loading, data, error } = useQuery(GET_PROFILE, {
		variables: { id: _id },
		onCompleted: setUserProfile,
	});
	//ignore the below line as it is showing warning 
	// eslint-disable-next-line
  
	useEffect(() => {
		const userProfile = data?.user;
		setUserProfile(userProfile);
	});

	const handleDeleteBook = async (bookId) => {
		const token = Auth.loggedIn() ? Auth.getToken() : null;
		if (!token) {

			      return false;
			}
	
		try {
			const { data } = await deleteBook({
				variables: { bookId: bookId,},
			});

			setUserProfile(data.deleteBook);
			 // upon success, remove book's id from localStorage
			removeBookId(bookId);
		} catch (err) {
			console.error(err);
		}
	};

	
	if (loading) {
		return <h2>LOADING...</h2>;
	}
	if (error) {
		return <h2>Somthing went wrong. Please try again...</h2>;
	}

	return (
		<>
			<Jumbotron fluid className='text-light bg-dark'>
				<Container>
					<h1>Viewing saved books!</h1>
				</Container>
			</Jumbotron>
			<Container>
				<h2>
					{userProfile?.savedBooks?.length
						? `Viewing ${userProfile.savedBooks.length} saved ${
							userProfile.savedBooks.length === 1 ? 'book' : 'books'
						  }:`
						: 'You have no saved books!'}
				</h2>
				<CardColumns>
					{userProfile?.savedBooks?.map((book) => {
						return (
							<Card key={book.bookId} border='dark'>
								{book.image ? (
									<Card.Img
										src={book.image}
										alt={`The cover for ${book.title}`}
										variant='top'
									/>
								) : null}
								<Card.Body>
									<Card.Title>{book.title}</Card.Title>
									<p className='small'>Authors: {book.authors}</p>
									<Card.Text>{book.description}</Card.Text>
									<Button
										className='btn-block btn-danger'
										onClick={() => handleDeleteBook(book.bookId)}
									>
										Delete this Book!
									</Button>
								</Card.Body>
							</Card>
						);
					})}
				</CardColumns>
			</Container>
		</>
	);
};

export default SavedBooks;