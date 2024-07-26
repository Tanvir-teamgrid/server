const Invite = require('../model/leagueinvitation');
const League = require('../model/leagues');
const User = require('../model/userSchema');

class InvitationController {
    static addinvitation = async (req, res) => {
        try {
            const { email } = req.body;
            const { id: leagueId } = req.params; // Assuming leagueId is in params
 
            const user = await User.findOne({ email: req.body.email });
            if (!user) {
                return res.status(404).json({ message: 'No user found with this email.' });
            }

            // Create an invitation
            const invitation = new Invite({
                email,
                userId: user.id,
                invitedBy: req.user.id, 
                leagueId,
              
            });

            // Save the invitation
            const savedInvitation = await invitation.save();

            // Update the league with the invited user
            const league = await League.findById(leagueId);
            if (!league) {
                return res.status(404).json({ message: 'League not found.' });
            }

            // Add the userId to league's userId array
            league.userId.push(user.id);

            // Save the league
            await league.save();

            res.status(200).json({
                message: 'Invitation added successfully.',
                invitationData: savedInvitation,
                leagueData: league
            });
        } catch (err) {
            console.error(err.message);
            res.status(500).json({ message:err.message });
        }
    }
}

module.exports = InvitationController;
