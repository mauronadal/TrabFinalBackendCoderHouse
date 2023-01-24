import { Router } from 'express';
const router = Router();

/* ---------------------------- cierre de sesión ---------------------------- */
router.post('/', (req, res) => {
  const email = req.user.email;
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ err });
    }

    req.session.destroy((err) => {
      if (!err) {
        res.status(200).json({
          success: `Hasta la vuelta ${email}`,
        });
      } else {
        res.status(500).json({
          error:
            'Algo salió mal al momento de cerrar sesión. Intenta nuevamente.',
        });
      }
    });
  });
});

export default router;
