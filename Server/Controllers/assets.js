const getAssets = async (req, res) => {
    try {
        // Simulate fetching assets from database
        
        res.status(200).json({message:' Assets fetched successfully'});
    } catch (error) {
        console.error('Error fetching assets:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
export { getAssets };